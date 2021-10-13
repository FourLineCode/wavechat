import { ObjectRef } from '@giraphql/core';
import { FriendRequest, Friendship } from '@prisma/client';
import { builder } from 'src/graphql/builder';
import { UserObject } from 'src/graphql/resolvers/UserResolver';

export const FriendshipObject: ObjectRef<Friendship, Friendship> = builder
	.objectRef<Friendship>('Friendship')
	.implement({
		name: 'FriendshipObject',
		description: 'Friendship object type',
		fields: (t) => ({
			id: t.exposeID('id'),
			pk: t.exposeInt('pk'),
			createdAt: t.expose('createdAt', { type: 'Date' }),
			updatedAt: t.expose('updatedAt', { type: 'Date' }),
			firstUserId: t.exposeID('firstUserId'),
			firstUser: t.field({
				type: UserObject,
				resolve: async (parent, _args, { db }) => {
					return await db.user.findFirst({
						where: { id: parent.firstUserId },
						rejectOnNotFound: true,
					});
				},
			}),
			secondUserId: t.exposeID('secondUserId'),
			secondUser: t.field({
				type: UserObject,
				resolve: async (parent, _args, { db }) => {
					return await db.user.findFirst({
						where: { id: parent.secondUserId },
						rejectOnNotFound: true,
					});
				},
			}),
		}),
	});

export const FriendRequestObject: ObjectRef<FriendRequest, FriendRequest> = builder
	.objectRef<FriendRequest>('FriendRequest')
	.implement({
		name: 'FriendRequestObject',
		description: 'FriendRequest object type',
		fields: (t) => ({
			id: t.exposeID('id'),
			pk: t.exposeInt('pk'),
			createdAt: t.expose('createdAt', { type: 'Date' }),
			updatedAt: t.expose('updatedAt', { type: 'Date' }),
			fromUserId: t.exposeID('fromUserId'),
			fromUser: t.field({
				type: UserObject,
				resolve: async (parent, _args, { db }) => {
					return await db.user.findFirst({
						where: { id: parent.fromUserId },
						rejectOnNotFound: true,
					});
				},
			}),
			toUserId: t.exposeID('toUserId'),
			toUser: t.field({
				type: UserObject,
				resolve: async (parent, _args, { db }) => {
					return await db.user.findFirst({
						where: { id: parent.toUserId },
						rejectOnNotFound: true,
					});
				},
			}),
		}),
	});

builder.mutationField('sendRequest', (t) =>
	t.field({
		type: FriendRequestObject,
		description: 'Send a friend request to a user',
		authScopes: { user: true },
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in to make a request');
			}

			if (userId === user.id) {
				throw new Error('You cannot send yourself friend request');
			}

			const existedRequest = await db.friendRequest.findFirst({
				where: {
					fromUserId: user.id,
					toUserId: userId,
				},
			});
			if (existedRequest) {
				throw new Error('You already sent a request to this user');
			}

			const existedFriendship = await db.friendship.findFirst({
				where: {
					OR: [
						{ firstUserId: user.id, secondUserId: userId },
						{ firstUserId: userId, secondUserId: user.id },
					],
				},
			});
			if (existedFriendship) {
				throw new Error('You are already friends with this user');
			}

			return await db.friendRequest.create({
				data: {
					fromUserId: user.id,
					toUserId: userId,
				},
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
		resolve: async (_parent, { requestId }, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in to unsend a request');
			}

			const pendingRequest = await db.friendRequest.findFirst({
				where: { id: requestId, fromUserId: user.id },
				rejectOnNotFound: true,
			});

			await db.friendRequest.delete({ where: { id: pendingRequest.id } });

			return true;
		},
	})
);

builder.mutationField('acceptRequest', (t) =>
	t.field({
		type: FriendshipObject,
		description: 'Accept a pending friend request',
		authScopes: { user: true },
		args: { requestId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { requestId }, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in to accept a request');
			}

			const pendingRequest = await db.friendRequest.findFirst({
				where: { id: requestId, toUserId: user.id },
				rejectOnNotFound: true,
			});

			const newFriendship = await db.friendship.create({
				data: {
					firstUserId: pendingRequest.fromUserId,
					secondUserId: pendingRequest.toUserId,
				},
			});

			await db.friendRequest.delete({ where: { id: pendingRequest.id } });

			return newFriendship;
		},
	})
);

builder.mutationField('declineRequest', (t) =>
	t.field({
		type: FriendRequestObject,
		description: 'Decline a pending friend request',
		authScopes: { user: true },
		args: { requestId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { requestId }, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in to decline a request');
			}

			const request = await db.friendRequest.findFirst({
				where: { id: requestId, toUserId: user.id },
				rejectOnNotFound: true,
			});
			if (request.toUserId !== user.id) {
				throw new Error('You cannot decline this request');
			}

			const declinedRequest = await db.friendRequest.delete({ where: { id: requestId } });

			return declinedRequest;
		},
	})
);

builder.mutationField('declineAllRequests', (t) =>
	t.field({
		type: 'Boolean',
		description: 'Decline all pending friend requests',
		authScopes: { user: true },
		resolve: async (_parent, _args, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in to decline all requests');
			}

			await db.friendRequest.deleteMany({
				where: { toUserId: user.id },
			});

			return true;
		},
	})
);

builder.mutationField('unfriend', (t) =>
	t.field({
		type: FriendshipObject,
		description: 'Unfriend a user',
		authScopes: { user: true },
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in to unfriend a user');
			}

			if (userId === user.id) {
				throw new Error('You cannot unfriend yourself');
			}

			const unfriend = await db.friendship.findFirst({
				where: {
					OR: [
						{ firstUserId: user.id, secondUserId: userId },
						{ firstUserId: userId, secondUserId: user.id },
					],
				},
				rejectOnNotFound: true,
			});

			await db.friendship.delete({ where: { id: unfriend.id } });

			return unfriend;
		},
	})
);

builder.queryField('friendsList', (t) =>
	t.field({
		type: [FriendshipObject],
		description: 'Get friends list of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in');
			}

			return await db.friendship.findMany({
				where: {
					OR: [{ firstUserId: user.id }, { secondUserId: user.id }],
				},
				orderBy: {
					updatedAt: 'asc',
				},
			});
		},
	})
);

builder.queryField('isFriend', (t) =>
	t.field({
		type: 'Boolean',
		description: 'Check if user is a friend',
		authScopes: { user: true },
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in to unfriend a user');
			}

			if (userId === user.id) {
				throw new Error('You cannot be friends with yourself');
			}

			const friendship = await db.friendship.findFirst({
				where: {
					OR: [
						{ firstUserId: user.id, secondUserId: userId },
						{ firstUserId: userId, secondUserId: user.id },
					],
				},
			});

			return !!friendship;
		},
	})
);

builder.queryField('pendingRequests', (t) =>
	t.field({
		type: [FriendRequestObject],
		description: 'Get pending requests of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in');
			}

			return await db.friendRequest.findMany({ where: { toUserId: user.id } });
		},
	})
);

builder.queryField('sentRequests', (t) =>
	t.field({
		type: [FriendRequestObject],
		description: 'Get sent requests of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { db, user }) => {
			if (!user) {
				throw new Error('You are not signed in');
			}

			return await db.friendRequest.findMany({ where: { fromUserId: user.id } });
		},
	})
);
