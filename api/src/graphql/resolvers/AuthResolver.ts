import { ObjectRef } from '@giraphql/core';
import { Session, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { builder } from 'src/graphql/builder';
import { UserObject } from 'src/graphql/resolvers/UserResolver';

export const SessionObject: ObjectRef<Session, Session> = builder
	.objectRef<Session>('Session')
	.implement({
		name: 'Session',
		description: 'Information about user session',
		fields: (t) => ({
			id: t.exposeID('id'),
			pk: t.exposeInt('pk'),
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

interface AuthResult {
	success: boolean;
	user: User;
}

const AuthResultObject: ObjectRef<AuthResult, AuthResult> = builder
	.objectRef<AuthResult>('AuthResult')
	.implement({
		name: 'AuthResult',
		description: 'Response object for authentication queries',
		fields: (t) => ({
			success: t.exposeBoolean('success'),
			user: t.field({
				type: UserObject,
				resolve: (result) => result.user,
			}),
		}),
	});

const SignupInput = builder.inputType('SignupInput', {
	fields: (t) => ({
		email: t.string({
			required: true,
			validate: {
				email: [true, { message: 'Invalid email address' }],
			},
		}),
		username: t.string({
			required: true,
			validate: {
				minLength: [2, { message: 'Username must be atleast 2 characters' }],
				maxLength: [32, { message: 'Username can be up to 32 characters' }],
				regex: [
					/^[A-Za-z0-9_]{1,15}$/,
					{ message: 'Username cantains invalid characters' },
				],
			},
		}),
		password: t.string({
			required: true,
			validate: {
				minLength: [6, { message: 'Password must be atleast 6 characters' }],
				maxLength: [18, { message: 'Password can be up to 18 characters' }],
			},
		}),
		bio: t.string({
			validate: {
				minLength: [2, { message: 'Bio is too short (minimum 2 characters)' }],
				maxLength: [256, { message: 'Bio is too long (maximum 256 characters)' }],
			},
		}),
		university: t.string({
			validate: {
				minLength: [2, { message: 'University name is too short' }],
				maxLength: [64, { message: 'University name too long' }],
			},
		}),
		department: t.string({
			validate: {
				minLength: [2, { message: 'Department name is too short' }],
				maxLength: [64, { message: 'Department name too long' }],
			},
		}),
		semester: t.int({
			validate: {
				positive: true,
				min: [0, { message: 'Semester must be in range 0-18' }],
				max: [18, { message: 'Semester must be in range 0-18' }],
			},
		}),
	}),
});

export interface JWTPayload {
	sessionId: string;
	userId: string;
}

builder.mutationField('signup', (t) =>
	t.field({
		type: AuthResultObject,
		description: 'Sign up new user',
		args: { input: t.arg({ type: SignupInput, required: true }) },
		resolve: async (_parent, { input }, { db, res }) => {
			const existentUser = await db.user.findFirst({
				where: {
					OR: [{ email: input.email }, { username: input.username.toLowerCase() }],
				},
			});

			if (existentUser) {
				throw new Error('User already exists with given username or email');
			}

			const newUser = await db.user.create({
				data: {
					email: input.email,
					username: input.username.toLowerCase(),
					displayName: input.username,
					password: bcrypt.hashSync(input.password, 10),
					bio: input.bio,
					university: input.university,
					department: input.department,
					semester: input.semester,
				},
			});

			const session = await db.session.create({
				data: {
					userId: newUser.id,
				},
			});

			const payload: JWTPayload = {
				sessionId: session.id,
				userId: session.userId,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET!);

			res.cookie('session', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
			});

			return { success: true, user: newUser };
		},
	})
);

const SigninInput = builder.inputType('SigninInput', {
	fields: (t) => ({
		email: t.string({
			required: true,
			validate: {
				email: [true, { message: 'Invalid email address' }],
			},
		}),
		password: t.string({
			required: true,
			validate: {
				minLength: [6, { message: 'Password must be atleast 6 characters' }],
				maxLength: [18, { message: 'Password can be up to 18 characters' }],
			},
		}),
	}),
});

builder.mutationField('signin', (t) =>
	t.field({
		type: AuthResultObject,
		description: 'Sign in user',
		args: { input: t.arg({ type: SigninInput, required: true }) },
		resolve: async (_parent, { input }, { db, res }) => {
			const user = await db.user.findFirst({
				where: {
					email: input.email,
				},
				rejectOnNotFound: true,
			});

			const validated = bcrypt.compareSync(input.password, user.password);
			if (!validated) {
				throw new Error('Invalid Credentials');
			}

			const session = await db.session.create({
				data: {
					userId: user.id,
				},
			});

			const payload: JWTPayload = {
				sessionId: session.id,
				userId: session.userId,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET!);

			res.cookie('session', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
			});

			return { success: true, user: user };
		},
	})
);

builder.queryField('authorize', (t) =>
	t.field({
		type: AuthResultObject,
		description: 'Authorize user session',
		authScopes: {
			public: true,
		},
		resolve: async (_parent, _args, { authorized, user }) => {
			if (!authorized || !user) {
				throw new Error('Unauthorized');
			}

			return { success: true, user };
		},
	})
);

interface SuccessResult {
	success: boolean;
}

const SuccessResultObject: ObjectRef<SuccessResult, SuccessResult> = builder
	.objectRef<SuccessResult>('SuccessResult')
	.implement({
		name: 'SuccessResult',
		description: 'Response object for succesful queries',
		fields: (t) => ({
			success: t.exposeBoolean('success'),
		}),
	});

builder.mutationField('signout', (t) =>
	t.field({
		type: SuccessResultObject,
		description: 'Sign out user',
		authScopes: {
			user: true,
		},
		resolve: async (_parent, _args, { db, authorized, session, res }) => {
			if (!authorized) {
				throw new Error('You are not signed in');
			}

			await db.session.delete({ where: { id: session?.id } });

			res.clearCookie('session');

			return { success: true };
		},
	})
);
