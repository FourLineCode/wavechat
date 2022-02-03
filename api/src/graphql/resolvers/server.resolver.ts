import { ObjectRef } from "@pothos/core";
import { Server, ServerChannel, ServerInvite, ServerType } from "@prisma/client";
import { builder } from "src/graphql/builder";
import { MessageThreadObject } from "src/graphql/resolvers/messageThread.resolver";
import { UserObject } from "src/graphql/resolvers/user.resolver";
import { services } from "src/services";

export const ServerObject: ObjectRef<Server, Server> = builder
    .objectRef<Server>("Server")
    .implement({
        description: "Server object type",
        fields: (t) => ({
            id: t.exposeID("id"),
            pk: t.exposeInt("pk"),
            createdAt: t.expose("createdAt", { type: "Date" }),
            updatedAt: t.expose("updatedAt", { type: "Date" }),
            name: t.exposeString("name"),
            type: t.exposeString("type"),
            iconUrl: t.exposeString("iconUrl", { nullable: true }),
            bannerUrl: t.exposeString("iconUrl", { nullable: true }),
            adminUserIds: t.exposeStringList("adminUserIds"),
            bannedUserIds: t.exposeStringList("bannedUserIds"),
            ownerId: t.exposeString("ownerId"),
            owner: t.field({
                type: UserObject,
                resolve: async (server) => {
                    return await services.user.getUserById(server.ownerId);
                },
            }),
            members: t.field({
                type: [UserObject],
                resolve: async (server) => {
                    return await services.server.getServerMembers(server.id);
                },
            }),
            pendingInvites: t.field({
                type: [ServerInviteObject],
                resolve: async (server) => {
                    return await services.server.getServerPendingInvites(server.id);
                },
            }),
        }),
    });

export const ServerChannelObject: ObjectRef<ServerChannel, ServerChannel> = builder
    .objectRef<ServerChannel>("ServerChannel")
    .implement({
        description: "ServerChannel object type",
        fields: (t) => ({
            id: t.exposeID("id"),
            pk: t.exposeInt("pk"),
            createdAt: t.expose("createdAt", { type: "Date" }),
            updatedAt: t.expose("updatedAt", { type: "Date" }),
            name: t.exposeString("name"),
            locked: t.exposeBoolean("locked"),
            threadId: t.exposeString("threadId"),
            thread: t.field({
                type: MessageThreadObject,
                resolve: async (serverChannel) => {
                    return await services.messageThread.getThreadByThreadId(serverChannel.threadId);
                },
            }),
        }),
    });

export const ServerInviteObject: ObjectRef<ServerInvite, ServerInvite> = builder
    .objectRef<ServerInvite>("ServerInvite")
    .implement({
        description: "ServerInvite object type",
        fields: (t) => ({
            id: t.exposeID("id"),
            pk: t.exposeInt("pk"),
            createdAt: t.expose("createdAt", { type: "Date" }),
            updatedAt: t.expose("updatedAt", { type: "Date" }),
            userId: t.exposeString("userId"),
            user: t.field({
                type: UserObject,
                resolve: async (serverInvite) => {
                    return await services.user.getUserById(serverInvite.userId);
                },
            }),
            serverId: t.exposeString("serverId"),
            server: t.field({
                type: ServerObject,
                resolve: async (serverInvite) => {
                    return await services.server.getServerById(serverInvite.serverId);
                },
            }),
        }),
    });

const CreateServerInput = builder.inputType("CreateServerInput", {
    fields: (t) => ({
        name: t.string({
            required: true,
            validate: {
                minLength: 2,
                maxLength: 32,
            },
        }),
        type: t.string({
            required: true,
            validate: (serverType) => {
                const types = Object.values(ServerType).map((s) => s.toLowerCase()) as string[];
                return types.includes(serverType.toLowerCase());
            },
        }),
        iconUrl: t.string({
            required: false,
            validate: {
                url: true,
            },
        }),
    }),
});

builder.mutationField("createServer", (t) =>
    t.field({
        type: ServerObject,
        description: "Create a new server",
        authScopes: { user: true },
        args: { input: t.arg({ type: CreateServerInput, required: true }) },
        resolve: async (_parent, { input }, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return await services.server.createServer({
                user,
                ...input,
                type: input.type.toUpperCase() as ServerType,
            });
        },
    })
);

builder.queryField("joinedServers", (t) =>
    t.field({
        type: [ServerObject],
        description: "Get all joined servers for current user",
        authScopes: { user: true },
        resolve: async (_parent, _args, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return await services.server.getJoinedServersByUserId(user.id);
        },
    })
);
