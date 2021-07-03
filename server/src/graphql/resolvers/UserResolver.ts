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
		role: t.exposeString('role'),
		avatarUrl: t.expose('avatarUrl', { type: 'String', nullable: true }),
		university: t.exposeString('university'),
		department: t.exposeString('department'),
		semester: t.exposeInt('semester'),
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
			// TODO: remove this later
			public: true,
			admin: true,
		},
		description: 'returns all users',
		resolve: async (_root, _args, { prisma }) => {
			return await prisma.user.findMany();
		},
	})
);
