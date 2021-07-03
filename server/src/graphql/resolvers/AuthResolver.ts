import { Session, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { builder } from '../builder';
import { UserObject } from './UserResolver';

export const SessionObject = builder.objectRef<Session>('Session');

SessionObject.implement({
	fields: (t) => ({
		id: t.exposeID('id'),
		createdAt: t.expose('createdAt', { type: 'Date' }),
		updatedAt: t.expose('updatedAt', { type: 'Date' }),
		userId: t.exposeID('userId'),
		user: t.loadable({
			type: UserObject,
			load: (ids: string[], context) => context.loader.loadUserByIDs(ids),
			resolve: (session) => session.userId,
		}),
	}),
});

interface SignupResult {
	success: boolean;
	user: User;
}

const SignupResultObject = builder.objectRef<SignupResult>('SignupResult');

SignupResultObject.implement({
	fields: (t) => ({
		success: t.exposeBoolean('success'),
		user: t.field({
			type: UserObject,
			resolve: (result) => result.user,
		}),
	}),
});

const SignupInput = builder.inputType('SignUpInput', {
	fields: (t) => ({
		// TODO: add error messages
		email: t.string({
			required: true,
			validate: {
				email: true,
			},
		}),
		username: t.string({
			required: true,
			validate: {
				minLength: 2,
				maxLength: 32,
				regex: /^[A-Za-z0-9_]{1,15}$/,
			},
		}),
		password: t.string({
			required: true,
			validate: {
				minLength: 6,
				maxLength: 18,
			},
		}),
		// TODO: add validations for uni info
		university: t.string(),
		department: t.string(),
		semester: t.int({
			validate: {
				min: 0,
				max: 18,
			},
		}),
	}),
});

builder.mutationField('signup', (t) =>
	t.field({
		type: SignupResultObject,
		description: 'Sign up new user',
		args: { input: t.arg({ type: SignupInput, required: true }) },
		resolve: async (_root, { input }, { prisma, res }) => {
			const existentUser = await prisma.user.findFirst({
				where: {
					OR: [{ email: input.email }, { username: input.username.toLowerCase() }],
				},
			});

			if (existentUser) {
				throw new Error('User already exists with given username or email');
			}

			const newUser = await prisma.user.create({
				data: {
					email: input.email,
					username: input.username.toLowerCase(),
					displayName: input.username,
					password: bcrypt.hashSync(input.password, 10),
					university: input.university,
					department: input.department,
					semester: input.semester,
				},
			});

			const session = await prisma.session.create({
				data: {
					userId: newUser.id,
				},
			});

			const payload = {
				sessionId: session.id,
				userId: session.userId,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET!);

			res.cookie('session', token, {
				httpOnly: true,
				secure: true,
				sameSite: true,
			});

			return { success: true, user: newUser };
		},
	})
);
