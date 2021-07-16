import { User } from '@prisma/client';
import { builder } from '../builder';
import { SessionObject } from './AuthResolver';

export const UserObject = builder.objectRef<User>('User');

UserObject.implement({
	fields: (t) => ({
		id: t.exposeID('id'),
		createdAt: t.expose('createdAt', { type: 'Date' }),
		updatedAt: t.expose('updatedAt', { type: 'Date' }),
		email: t.exposeString('email'),
		username: t.exposeString('username'),
		displayName: t.exposeString('displayName'),
		role: t.exposeString('role'),
		avatarUrl: t.expose('avatarUrl', { type: 'String', nullable: true }),
		university: t.exposeString('university', { nullable: true }),
		department: t.exposeString('department', { nullable: true }),
		semester: t.exposeInt('semester', { nullable: true }),
		sessions: t.field({
			type: [SessionObject],
			resolve: async (user, _args, { prisma }) => {
				return await prisma.session.findMany({
					where: {
						userId: user.id,
					},
				});
			},
		}),
	}),
});

builder.queryField('getAllUsers', (t) =>
	t.field({
		type: [UserObject],
		authScopes: {
			admin: true,
		},
		description: 'returns all users',
		resolve: async (_root, _args, context) => {
			console.log(context);
			return await context.prisma.user.findMany();
		},
	})
);
