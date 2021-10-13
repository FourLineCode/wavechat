import { ObjectRef } from '@giraphql/core';
import { MessageThread } from '@prisma/client';
import { builder } from 'src/graphql/builder';
import { MessageObject } from 'src/graphql/resolvers/MessageResolver';
import { UserObject } from 'src/graphql/resolvers/UserResolver';

export const MessageThreadObject: ObjectRef<MessageThread, MessageThread> = builder
	.objectRef<MessageThread>('MessageThread')
	.implement({
		name: 'MessageThread',
		description: 'MessageThread object type',
		fields: (t) => ({
			id: t.exposeID('id'),
			pk: t.exposeInt('pk'),
			createdAt: t.expose('createdAt', { type: 'Date' }),
			updatedAt: t.expose('updatedAt', { type: 'Date' }),
			messages: t.field({
				type: [MessageObject],
				resolve: async (messageThread, _args, { db }) => {
					return await db.message.findMany({
						where: {
							threadId: messageThread.id,
						},
					});
				},
			}),
			participants: t.field({
				type: [UserObject],
				resolve: async (messageThread, _args, { db }) => {
					const thread = await db.messageThread.findFirst({
						where: { id: messageThread.id },
						include: {
							participants: true,
						},
						rejectOnNotFound: true,
					});

					return thread.participants;
				},
			}),
		}),
	});

builder.mutationField('createMessageThread', (t) =>
	t.field({
		type: MessageThreadObject,
		description: 'Returns an existing or newly created MessageThread',
		authScopes: {
			user: true,
		},
		args: { userId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { userId }, { db, user }) => {
			if (!user) {
				throw new Error('You are not authorized to create new Message Thread');
			}

			if (user.id === userId) {
				throw new Error('You cannot Message yourself');
			}

			const existingThread = await db.messageThread.findFirst({
				where: {
					participants: {
						every: {
							id: {
								in: [userId, user?.id],
							},
						},
					},
				},
			});

			if (existingThread) {
				return existingThread;
			}

			return await db.messageThread.create({
				data: {
					participants: {
						connect: [{ id: user.id }, { id: userId }],
					},
				},
			});
		},
	})
);

builder.queryField('activeMessageThreads', (t) =>
	t.field({
		type: [MessageThreadObject],
		description: 'Returns currently active MessageThreads for user',
		authScopes: {
			user: true,
		},
		resolve: async (_parent, _args, { db, user }) => {
			if (!user) {
				throw new Error('You are not authorized to query Message Threads');
			}

			const currentUser = await db.user.findFirst({
				where: { id: user.id },
				include: {
					messageThreads: {
						include: {
							participants: true,
						},
						orderBy: {
							updatedAt: 'desc',
						},
					},
					friends_forward: true,
					friends_inverse: true,
				},
				rejectOnNotFound: true,
			});

			const friendsIds = [
				...currentUser.friends_forward.map((f) =>
					f.firstUserId !== user.id ? f.firstUserId : f.secondUserId
				),
				...currentUser.friends_inverse.map((f) =>
					f.firstUserId !== user.id ? f.firstUserId : f.secondUserId
				),
			];

			const threads = currentUser.messageThreads.filter((thread) => {
				const id = thread.participants.filter((u) => u.id !== user.id)[0].id;
				return friendsIds.includes(id);
			});

			return threads;
		},
	})
);

builder.queryField('messageThread', (t) =>
	t.field({
		type: MessageThreadObject,
		description: 'Returns a MessageThread by id',
		authScopes: {
			user: true,
		},
		args: { threadId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { threadId }, { db, user }) => {
			if (!user) {
				throw new Error('You are not authorized to get a Message Thread');
			}

			const thread = await db.messageThread.findFirst({
				where: { id: threadId },
				include: {
					participants: true,
				},
				rejectOnNotFound: true,
			});

			const userIsInThread = thread.participants.reduce(
				(acc, part) => acc || user.id === part.id,
				false
			);

			if (!userIsInThread) {
				throw new Error('You do not have participation in this Message Thread');
			}

			return thread;
		},
	})
);
