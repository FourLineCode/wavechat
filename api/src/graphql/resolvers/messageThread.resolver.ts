import { ObjectRef } from "@pothos/core";
import { MessageThread } from "@prisma/client";
import { builder } from "src/graphql/builder";
import { MessageObject } from "src/graphql/resolvers/message.resolver";
import { UserObject } from "src/graphql/resolvers/user.resolver";
import { services } from "src/services";

export const MessageThreadObject: ObjectRef<MessageThread, MessageThread> = builder
    .objectRef<MessageThread>("MessageThread")
    .implement({
        description: "MessageThread object type",
        fields: (t) => ({
            id: t.exposeID("id"),
            pk: t.exposeInt("pk"),
            createdAt: t.expose("createdAt", { type: "Date" }),
            updatedAt: t.expose("updatedAt", { type: "Date" }),
            messages: t.field({
                type: [MessageObject],
                resolve: async (messageThread) => {
                    return await services.message.getMessagesByThreadId(messageThread.id);
                },
            }),
            participants: t.field({
                type: [UserObject],
                resolve: async (messageThread) => {
                    return await services.messageThread.getThreadParticipants(messageThread.id);
                },
            }),
        }),
    });

builder.mutationField("createMessageThread", (t) =>
    t.field({
        type: MessageThreadObject,
        description: "Returns an existing or newly created MessageThread",
        authScopes: {
            user: true,
        },
        args: { userId: t.arg({ type: "String", required: true }) },
        resolve: async (_parent, { userId }, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return await services.messageThread.getOrCreateThread({
                userId,
                currentUserId: user.id,
            });
        },
    })
);

builder.queryField("activeMessageThreads", (t) =>
    t.field({
        type: [MessageThreadObject],
        description: "Returns currently active MessageThreads for user",
        authScopes: {
            user: true,
        },
        resolve: async (_parent, _args, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return await services.messageThread.getActiveThreads(user.id);
        },
    })
);

builder.queryField("messageThread", (t) =>
    t.field({
        type: MessageThreadObject,
        description: "Returns a MessageThread by id",
        authScopes: {
            user: true,
        },
        args: { threadId: t.arg({ type: "String", required: true }) },
        resolve: async (_parent, { threadId }, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return await services.messageThread.getThreadById({ threadId, userId: user.id });
        },
    })
);
