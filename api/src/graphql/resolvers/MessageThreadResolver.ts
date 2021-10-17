import { ObjectRef } from '@giraphql/core';
import { MessageThread } from '@prisma/client';
import { builder } from 'src/graphql/builder';
import { MessageObject } from 'src/graphql/resolvers/MessageResolver';
import { UserObject } from 'src/graphql/resolvers/UserResolver';
import { services } from 'src/services';

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
				resolve: async (messageThread) => {
					return await services.messageService.getMessagesByThreadId(messageThread.id);
				},
			}),
			participants: t.field({
				type: [UserObject],
				resolve: async (messageThread) => {
					return await services.messageThreadService.getThreadParticipants(
						messageThread.id
					);
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
		resolve: async (_parent, { userId }, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.messageThreadService.getOrCreateThread({
				userId,
				currentUserId: user.id,
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
		resolve: async (_parent, _args, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.messageThreadService.getActiveThreads(user.id);
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
		resolve: async (_parent, { threadId }, { user }) => {
			if (!user) throw new Error('Unauthorized');

			return await services.messageThreadService.getThreadById({ threadId, userId: user.id });
		},
	})
);
