import { FriendRequest, Friendship } from '@prisma/client';
import { builder } from '../builder';
import { UserObject } from './UserResolver';

export const FriendshipObject = builder.objectRef<Friendship>('Friendship');

FriendshipObject.implement({
	fields: (t) => ({
		id: t.exposeID('id'),
		createdAt: t.expose('createdAt', { type: 'Date' }),
		updatedAt: t.expose('updatedAt', { type: 'Date' }),
		firstUserId: t.exposeID('firstUserId'),
		firstUser: t.field({
			type: UserObject,
			resolve: async (parent, _args, { prisma }) => {
				return await prisma.user.findFirst({
					where: { id: parent.firstUserId },
					rejectOnNotFound: true,
				});
			},
		}),
		secondUserId: t.exposeID('secondUserId'),
		secondUser: t.field({
			type: UserObject,
			resolve: async (parent, _args, { prisma }) => {
				return await prisma.user.findFirst({
					where: { id: parent.secondUserId },
					rejectOnNotFound: true,
				});
			},
		}),
	}),
});

export const FriendRequestObject = builder.objectRef<FriendRequest>('FriendRequest');

FriendRequestObject.implement({
	fields: (t) => ({
		id: t.exposeID('id'),
		createdAt: t.expose('createdAt', { type: 'Date' }),
		updatedAt: t.expose('updatedAt', { type: 'Date' }),
		fromUserId: t.exposeID('fromUserId'),
		fromUser: t.field({
			type: UserObject,
			resolve: async (parent, _args, { prisma }) => {
				return await prisma.user.findFirst({
					where: { id: parent.fromUserId },
					rejectOnNotFound: true,
				});
			},
		}),
		toUserId: t.exposeID('toUserId'),
		toUser: t.field({
			type: UserObject,
			resolve: async (parent, _args, { prisma }) => {
				return await prisma.user.findFirst({
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
		resolve: async (_parent, { userId }, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in to make a request');
			}

			if (userId === user.id) {
				throw new Error('You cannot send yourself friend request');
			}

			const existedRequest = await prisma.friendRequest.findFirst({
				where: {
					fromUserId: user.id,
					toUserId: userId,
				},
			});
			if (existedRequest) {
				throw new Error('You already sent a request to this user');
			}

			const existedFriendship = await prisma.friendship.findFirst({
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

			return await prisma.friendRequest.create({
				data: {
					fromUserId: user.id,
					toUserId: userId,
				},
			});
		},
	})
);

builder.mutationField('acceptRequest', (t) =>
	t.field({
		type: FriendshipObject,
		description: 'Accept a pending friend request',
		authScopes: { user: true },
		args: { requestId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { requestId }, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in to accept a request');
			}

			const pendingRequest = await prisma.friendRequest.findFirst({
				where: { id: requestId, toUserId: user.id },
				rejectOnNotFound: true,
			});

			const newFriendship = await prisma.friendship.create({
				data: {
					firstUserId: pendingRequest.fromUserId,
					secondUserId: pendingRequest.toUserId,
				},
			});

			await prisma.friendRequest.delete({ where: { id: pendingRequest.id } });

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
		resolve: async (_parent, { requestId }, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in to decline a request');
			}

			const request = await prisma.friendRequest.findFirst({
				where: { id: requestId, toUserId: user.id },
				rejectOnNotFound: true,
			});
			if (request.toUserId !== user.id) {
				throw new Error('You cannot decline this request');
			}

			const declinedRequest = await prisma.friendRequest.delete({ where: { id: requestId } });

			return declinedRequest;
		},
	})
);

builder.mutationField('declineAllRequests', (t) =>
	t.field({
		type: 'Boolean',
		description: 'Decline all pending friend requests',
		authScopes: { user: true },
		resolve: async (_parent, _args, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in to decline all requests');
			}

			await prisma.friendRequest.deleteMany({
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
		resolve: async (_parent, { userId }, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in to unfriend a user');
			}

			if (userId === user.id) {
				throw new Error('You cannot unfriend yourself');
			}

			const unfriend = await prisma.friendship.findFirst({
				where: {
					OR: [
						{ firstUserId: user.id, secondUserId: userId },
						{ firstUserId: userId, secondUserId: user.id },
					],
				},
				rejectOnNotFound: true,
			});

			await prisma.friendship.delete({ where: { id: unfriend.id } });

			return unfriend;
		},
	})
);

builder.queryField('getFriendsList', (t) =>
	t.field({
		type: [FriendshipObject],
		description: 'Get friends list of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in');
			}

			return await prisma.friendship.findMany({
				where: {
					OR: [{ firstUserId: user.id }, { secondUserId: user.id }],
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
		resolve: async (_parent, { userId }, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in to unfriend a user');
			}

			if (userId === user.id) {
				throw new Error('You cannot be friends with yourself');
			}

			const friendship = await prisma.friendship.findFirst({
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

builder.queryField('getPendingRequests', (t) =>
	t.field({
		type: [FriendRequestObject],
		description: 'Get pending requests of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in');
			}

			return await prisma.friendRequest.findMany({ where: { toUserId: user.id } });
		},
	})
);

builder.queryField('getSentRequests', (t) =>
	t.field({
		type: [FriendRequestObject],
		description: 'Get sent requests of current user',
		authScopes: { user: true },
		resolve: async (_parent, _args, { prisma, user }) => {
			if (!user) {
				throw new Error('You are not signed in');
			}

			return await prisma.friendRequest.findMany({ where: { fromUserId: user.id } });
		},
	})
);
