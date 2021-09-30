import { User } from '@prisma/client';
import { builder } from 'src/graphql/builder';
import { SessionObject } from 'src/graphql/resolvers/AuthResolver';
import { FriendRequestObject, FriendshipObject } from 'src/graphql/resolvers/FriendshipResolver';

export const UserObject = builder.objectRef<User>('User');

UserObject.implement({
	fields: (t) => ({
		id: t.exposeID('id'),
		pk: t.exposeInt('pk'),
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
			resolve: async (user, _args, { db }) => {
				return await db.session.findMany({
					where: {
						userId: user.id,
					},
				});
			},
		}),
		friends: t.field({
			type: [FriendshipObject],
			resolve: async (parent, _args, { db }) => {
				return await db.friendship.findMany({
					where: {
						OR: [{ firstUserId: parent.id }, { secondUserId: parent.id }],
					},
				});
			},
		}),
		pendingRequests: t.field({
			type: [FriendRequestObject],
			resolve: async (parent, _args, { db }) => {
				return await db.friendRequest.findMany({ where: { toUserId: parent.id } });
			},
		}),
		sentRequests: t.field({
			type: [FriendRequestObject],
			resolve: async (parent, _args, { db }) => {
				return await db.friendRequest.findMany({ where: { fromUserId: parent.id } });
			},
		}),
	}),
});

builder.queryField('allUsers', (t) =>
	t.field({
		type: [UserObject],
		description: 'returns all users',
		authScopes: {
			admin: true,
		},
		resolve: async (_parent, _args, { db }) => {
			return await db.user.findMany();
		},
	})
);

builder.queryField('user', (t) =>
	t.field({
		type: UserObject,
		description: 'returns info for a user',
		authScopes: {
			user: true,
		},
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }, { db }) => {
			return await db.user.findUnique({ where: { id: userId }, rejectOnNotFound: true });
		},
	})
);
