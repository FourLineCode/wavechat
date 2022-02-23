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
            bannerUrl: t.exposeString("bannerUrl", { nullable: true }),
            adminUserIds: t.exposeStringList("adminUserIds"),
            bannedUserIds: t.exposeStringList("bannedUserIds"),
            ownerId: t.exposeString("ownerId"),
            owner: t.loadable({
                type: UserObject,
                sort: (user) => user.id,
                load: async (ids: string[]) => await services.dataloader.loadUserByIDs(ids),
                resolve: (server) => server.ownerId,
            }),
            members: t.field({
                type: [UserObject],
                resolve: async (server) => {
                    return await services.server.getServerMembers(server.id);
                },
            }),
            channels: t.field({
                type: [ServerChannelObject],
                resolve: async (server) => {
                    return await services.server.getServerChannelsByServerId(server.id);
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
            serverId: t.exposeString("serverId"),
            server: t.loadable({
                type: ServerObject,
                sort: (server) => server.id,
                load: async (ids: string[]) => await services.dataloader.loadServerByIDs(ids),
                resolve: (channel) => channel.serverId,
            }),
            threadId: t.exposeString("threadId"),
            thread: t.loadable({
                type: MessageThreadObject,
                sort: (thread) => thread.id,
                load: async (ids: string[]) => {
                    return await services.dataloader.loadMessageThreadByIDs(ids);
                },
                resolve: (serverChannel) => serverChannel.threadId,
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
            fromUserId: t.exposeString("fromUserId"),
            fromUser: t.loadable({
                type: UserObject,
                sort: (user) => user.id,
                load: async (ids: string[]) => await services.dataloader.loadUserByIDs(ids),
                resolve: (serverInvite) => serverInvite.fromUserId,
            }),
            toUserId: t.exposeString("toUserId"),
            toUser: t.loadable({
                type: UserObject,
                sort: (user) => user.id,
                load: async (ids: string[]) => await services.dataloader.loadUserByIDs(ids),
                resolve: (serverInvite) => serverInvite.toUserId,
            }),
            serverId: t.exposeString("serverId"),
            server: t.loadable({
                type: ServerObject,
                sort: (server) => server.id,
                load: async (ids: string[]) => await services.dataloader.loadServerByIDs(ids),
                resolve: (serverInvite) => serverInvite.serverId,
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

builder.queryField("server", (t) =>
    t.field({
        type: ServerObject,
        description: "Get a server by id",
        authScopes: { user: true },
        args: { serverId: t.arg({ type: "String", required: true }) },
        resolve: async (_parent, { serverId }, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return await services.server.getServerByIdForUser({ serverId, userId: user.id });
        },
    })
);

builder.queryField("invitableUserList", (t) =>
    t.field({
        type: [UserObject],
        description: "Get user list for a server that are invitable",
        authScopes: { user: true },
        args: { serverId: t.arg({ type: "String", required: true }) },
        resolve: async (_parent, { serverId }, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return await services.server.getInvitableUsersList({ serverId, userId: user.id });
        },
    })
);

builder.mutationField("inviteUserToServerById", (t) =>
    t.field({
        type: ServerInviteObject,
        description: "Invite a user to a server",
        authScopes: { user: true },
        args: {
            userId: t.arg({ type: "String", required: true }),
            serverId: t.arg({ type: "String", required: true }),
        },
        resolve: async (_parent, { userId, serverId }, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return await services.server.inviteUserToServerById({
                serverId,
                fromUserId: user.id,
                toUserId: userId,
            });
        },
    })
);
