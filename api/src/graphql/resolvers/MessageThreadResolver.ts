import { MessageThread } from '@prisma/client';
import { builder } from 'src/graphql/builder';
import { MessageObject } from 'src/graphql/resolvers/MessageResolver';
import { UserObject } from 'src/graphql/resolvers/UserResolver';

export const MessageThreadObject = builder.objectRef<MessageThread>('MessageThread');

MessageThreadObject.implement({
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
