import { ObjectRef } from '@giraphql/core';
import { Message } from '@prisma/client';
import { builder } from 'src/graphql/builder';
import { MessageThreadObject } from 'src/graphql/resolvers/MessageThreadResolver';
import { UserObject } from 'src/graphql/resolvers/UserResolver';
import { services } from 'src/services';

export const MessageObject: ObjectRef<Message, Message> = builder
	.objectRef<Message>('Message')
	.implement({
		name: 'Message',
		description: 'Message object type',
		fields: (t) => ({
			id: t.exposeID('id'),
			pk: t.exposeInt('pk'),
			createdAt: t.expose('createdAt', { type: 'Date' }),
			updatedAt: t.expose('updatedAt', { type: 'Date' }),
			body: t.exposeString('body'),
			authorId: t.exposeID('authorId'),
			author: t.loadable({
				type: UserObject,
				sort: (user) => user.id,
				load: (ids: string[]) => services.dataLoaderService.loadUserByIDs(ids),
				resolve: (message) => message.authorId,
			}),
			threadId: t.exposeID('threadId'),
			thread: t.loadable({
				type: MessageThreadObject,
				sort: (thread) => thread.id,
				load: (ids: string[]) => services.dataLoaderService.loadMessageThreadByIDs(ids),
				resolve: (message) => message.threadId,
			}),
		}),
	});
