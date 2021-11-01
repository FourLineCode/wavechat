import { ObjectRef } from '@giraphql/core';
import { Message } from '@prisma/client';
import { UserDTO } from '@shared/types/auth';
import { MessageDTO } from '@shared/types/message';
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

export const UserDTOInput = builder.inputRef<UserDTO>('UserDTOInput').implement({
	fields: (t) => ({
		id: t.string({ required: true }),
		username: t.string({ required: true }),
		displayName: t.string({ required: true }),
		avatarUrl: t.string(),
	}),
});

export const CreateMessageInput = builder.inputRef<MessageDTO>('CreateMessageInput').implement({
	fields: (t) => ({
		id: t.string(),
		pk: t.int(),
		body: t.string({
			required: true,
			validate: {
				minLength: 1,
			},
		}),
		createdAt: t.string({ required: true }),
		updatedAt: t.string({ required: true }),
		threadId: t.string({ required: true }),
		authorId: t.string({ required: true }),
		author: t.field({
			type: UserDTOInput,
			required: true,
		}),
	}),
});

builder.mutationField('createMessage', (t) =>
	t.field({
		type: MessageObject,
		description: 'Saves a message to the database',
		authScopes: { internal: true },
		args: { messageDTO: t.arg({ type: CreateMessageInput, required: true }) },
		resolve: async (_parent, { messageDTO }) => {
			return await services.messageService.createMessage(messageDTO);
		},
	})
);
