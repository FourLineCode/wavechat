import { ObjectRef } from '@giraphql/core';
import { FriendRequest, Friendship } from '@prisma/client';
import { builder } from 'src/graphql/builder';
import { UserObject } from 'src/graphql/resolvers/UserResolver';
import { services } from 'src/services';

export const FriendshipObject: ObjectRef<Friendship, Friendship> = builder
	.objectRef<Friendship>('Friendship')
	.implement({
		name: 'Friendship',
		description: 'Friendship object type',
		fields: (t) => ({
			id: t.exposeID('id'),
			pk: t.exposeInt('pk'),
			createdAt: t.expose('createdAt', { type: 'Date' }),
			updatedAt: t.expose('updatedAt', { type: 'Date' }),
			firstUserId: t.exposeID('firstUserId'),
			firstUser: t.loadable({
				type: UserObject,
				load: (ids: string[]) => services.dataLoaderService.loadUserByIDs(ids),
				resolve: (parent) => parent.firstUserId,
			}),
			secondUserId: t.exposeID('secondUserId'),
			secondUser: t.loadable({
				type: UserObject,
				load: (ids: string[]) => services.dataLoaderService.loadUserByIDs(ids),
				resolve: (parent) => parent.secondUserId,
			}),
		}),
	});

export const FriendRequestObject: ObjectRef<FriendRequest, FriendRequest> = builder
	.objectRef<FriendRequest>('FriendRequest')
	.implement({
		name: 'FriendRequest',
		description: 'FriendRequest object type',
		fields: (t) => ({
			id: t.exposeID('id'),
			pk: t.exposeInt('pk'),
			createdAt: t.expose('createdAt', { type: 'Date' }),
			updatedAt: t.expose('updatedAt', { type: 'Date' }),
			fromUserId: t.exposeID('fromUserId'),
			fromUser: t.loadable({
				type: UserObject,
				load: (ids: string[]) => services.dataLoaderService.loadUserByIDs(ids),
				resolve: (parent) => parent.fromUserId,
			}),
			toUserId: t.exposeID('toUserId'),
			toUser: t.loadable({
				type: UserObject,
				load: (ids: string[]) => services.dataLoaderService.loadUserByIDs(ids),
				resolve: (parent) => parent.toUserId,
			}),
		}),
	});

builder.mutationField('sendRequest', (t) =>
	t.field({
		type: FriendRequestObject,
		description: 'Send a friend request to a user',
		authScopes: { user: true },
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.sendReuqest({
				fromUserId: user.id,
				toUserId: userId,
			});
		},
	})
);

builder.mutationField('unsendRequest', (t) =>
	t.field({
		type: 'Boolean',
		description: 'Unsend a sent friend request',
		authScopes: { user: true },
		args: { requestId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { requestId }, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.unsendRequest({ requestId, ownerId: user.id });
		},
	})
);

builder.mutationField('acceptRequest', (t) =>
	t.field({
		type: FriendshipObject,
		description: 'Accept a pending friend request',
		authScopes: { user: true },
		args: { requestId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { requestId }, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.acceptRequest({ requestId, userId: user.id });
		},
	})
);

builder.mutationField('declineRequest', (t) =>
	t.field({
		type: FriendRequestObject,
		description: 'Decline a pending friend request',
		authScopes: { user: true },
		args: { requestId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { requestId }, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.declineRequest({ requestId, userId: user.id });
		},
	})
);

builder.mutationField('declineAllRequests', (t) =>
	t.field({
		type: 'Boolean',
		description: 'Decline all pending friend requests',
		authScopes: { user: true },
		resolve: async (_parent, _args, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.declineAllRequests(user.id);
		},
	})
);

builder.mutationField('unfriend', (t) =>
	t.field({
		type: FriendshipObject,
		description: 'Unfriend a user',
		authScopes: { user: true },
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.unfriend({ userId, currentUserId: user.id });
		},
	})
);

builder.queryField('friendsList', (t) =>
	t.field({
		type: [FriendshipObject],
		description: 'Get friends list of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.getFriendList(user.id);
		},
	})
);

builder.queryField('isFriend', (t) =>
	t.field({
		type: 'Boolean',
		description: 'Check if user is a friend',
		authScopes: { user: true },
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.isUserFriend({
				userId,
				currentUserId: user.id,
			});
		},
	})
);

builder.queryField('pendingRequests', (t) =>
	t.field({
		type: [FriendRequestObject],
		description: 'Get pending requests of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.getPendingRequests(user.id);
		},
	})
);

builder.queryField('sentRequests', (t) =>
	t.field({
		type: [FriendRequestObject],
		description: 'Get sent requests of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.friendshipService.getSentRequests(user.id);
		},
	})
);
