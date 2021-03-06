import { ObjectRef } from "@pothos/core";
import { Message } from "@prisma/client";
import { MediaDTO, MessageDTO, UserDTO } from "@wavechat/shared";
import { builder } from "src/graphql/builder";
import { MediaObject } from "src/graphql/resolvers/media.resolver";
import { MessageThreadObject } from "src/graphql/resolvers/messageThread.resolver";
import { UserObject } from "src/graphql/resolvers/user.resolver";
import { services } from "src/services";

export const MessageObject: ObjectRef<Message, Message> = builder
  .objectRef<Message>("Message")
  .implement({
    description: "Message object type",
    fields: (t) => ({
      id: t.exposeID("id"),
      pk: t.exposeInt("pk"),
      createdAt: t.expose("createdAt", { type: "Date" }),
      updatedAt: t.expose("updatedAt", { type: "Date" }),
      body: t.exposeString("body"),
      attachments: t.field({
        type: [MediaObject],
        resolve: async (message) => {
          return await services.media.getMediaForMessage(message.id);
        },
      }),
      authorId: t.exposeID("authorId"),
      author: t.loadable({
        type: UserObject,
        sort: (user) => user.id,
        load: (ids: string[]) => services.dataloader.loadUserByIDs(ids),
        resolve: (message) => message.authorId,
      }),
      threadId: t.exposeID("threadId"),
      thread: t.loadable({
        type: MessageThreadObject,
        sort: (thread) => thread.id,
        load: (ids: string[]) => services.dataloader.loadMessageThreadByIDs(ids),
        resolve: (message) => message.threadId,
      }),
    }),
  });

export const UserDTOInput = builder.inputRef<UserDTO>("UserDTOInput").implement({
  fields: (t) => ({
    id: t.string({ required: true }),
    username: t.string({ required: true }),
    displayName: t.string({ required: true }),
    avatarUrl: t.string(),
  }),
});

export const MediaDTOInput = builder.inputRef<MediaDTO>("MediaDTOInput").implement({
  fields: (t) => ({
    id: t.string(),
    url: t.string({ required: true }),
    filename: t.string({ required: true }),
    mimetype: t.string({ required: true }),
    encoding: t.string({ required: true }),
  }),
});

export const CreateMessageInput = builder.inputRef<MessageDTO>("CreateMessageInput").implement({
  fields: (t) => ({
    id: t.string(),
    pk: t.int(),
    body: t.string({
      required: true,
    }),
    attachments: t.field({
      type: [MediaDTOInput],
      required: false,
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

builder.mutationField("createMessage", (t) =>
  t.field({
    type: MessageObject,
    description: "Saves a message to the database",
    authScopes: { internal: true },
    args: { messageDTO: t.arg({ type: CreateMessageInput, required: true }) },
    resolve: async (_parent, { messageDTO }) => {
      return await services.message.createMessage(messageDTO);
    },
  })
);

builder.queryField("threadMessages", (t) =>
  t.field({
    type: [MessageObject],
    description: "Returns all messages owned by a thread",
    authScopes: { user: true },
    args: { threadId: t.arg({ type: "String", required: true }) },
    resolve: async (_parent, { threadId }, { user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }

      return await services.message.getUserThreadMessages({
        threadId,
        userId: user.id,
      });
    },
  })
);
