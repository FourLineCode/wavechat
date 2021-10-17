import { ObjectRef } from '@giraphql/core';
import { User } from '@prisma/client';
import { builder } from 'src/graphql/builder';
import { SessionObject } from 'src/graphql/resolvers/AuthResolver';
import { FriendRequestObject, FriendshipObject } from 'src/graphql/resolvers/FriendshipResolver';
import { MessageObject } from 'src/graphql/resolvers/MessageResolver';
import { MessageThreadObject } from 'src/graphql/resolvers/MessageThreadResolver';
import { services } from 'src/services';

export const UserObject: ObjectRef<User, User> = builder.objectRef<User>('User').implement({
	name: 'User',
	description: 'User object type',
	fields: (t) => ({
		id: t.exposeID('id'),
		pk: t.exposeInt('pk'),
		createdAt: t.expose('createdAt', { type: 'Date' }),
		updatedAt: t.expose('updatedAt', { type: 'Date' }),
		email: t.exposeString('email'),
		username: t.exposeString('username'),
		displayName: t.exposeString('displayName'),
		role: t.exposeString('role'),
		bio: t.expose('bio', { type: 'String', nullable: true }),
		avatarUrl: t.expose('avatarUrl', { type: 'String', nullable: true }),
		university: t.exposeString('university', { nullable: true }),
		department: t.exposeString('department', { nullable: true }),
		semester: t.exposeInt('semester', { nullable: true }),
		sessions: t.field({
			type: [SessionObject],
			resolve: async (user) => {
				return await services.authService.getSessionsForUser(user.id);
			},
		}),
		friends: t.field({
			type: [FriendshipObject],
			resolve: async (user) => {
				return await services.friendshipService.getFriendList(user.id);
			},
		}),
		pendingRequests: t.field({
			type: [FriendRequestObject],
			resolve: async (user) => {
				return await services.friendshipService.getPendingRequests(user.id);
			},
		}),
		sentRequests: t.field({
			type: [FriendRequestObject],
			resolve: async (user) => {
				return await services.friendshipService.getSentRequests(user.id);
			},
		}),
		messages: t.field({
			type: [MessageObject],
			resolve: async (user) => {
				return await services.messageService.getMessagesByAuthorId(user.id);
			},
		}),
		messageThreads: t.field({
			type: [MessageThreadObject],
			resolve: async (user) => {
				return await services.messageThreadService.getThreadsByUserId(user.id);
			},
		}),
	}),
});

builder.queryField('allUsers', (t) =>
	t.field({
		type: [UserObject],
		description: 'returns all users',
		authScopes: { admin: true },
		resolve: async () => {
			return await services.userService.getAllUsers();
		},
	})
);

builder.queryField('user', (t) =>
	t.field({
		type: UserObject,
		description: 'returns info for a user',
		authScopes: { user: true },
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }) => {
			return await services.userService.getUserById(userId);
		},
	})
);
