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
