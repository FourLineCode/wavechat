import { ServerType, User } from "@prisma/client";
import { db } from "prisma/connection";

export async function getServerById(serverId: string) {
    return await db.server.findFirst({
        where: {
            id: serverId,
        },
        rejectOnNotFound: true,
    });
}

export async function getServerMembers(serverId: string) {
    const server = await db.server.findFirst({
        where: {
            id: serverId,
        },
        include: {
            members: true,
        },
    });

    if (!server) {
        throw new Error("Server not found");
    }

    return server.members;
}

export async function getServerPendingInvites(serverId: string) {
    const server = await db.server.findFirst({
        where: {
            id: serverId,
        },
        include: {
            pendingInvites: true,
        },
    });

    if (!server) {
        throw new Error("Server not found");
    }

    return server.pendingInvites;
}

interface CreateServerParams {
    name: string;
    type: ServerType;
    iconUrl?: string | null;
    user: User;
}

export async function createServer({ name, type, iconUrl, user }: CreateServerParams) {
    return await db.server.create({
        data: {
            name,
            type,
            iconUrl,
            owner: {
                connect: {
                    id: user.id,
                },
            },
            members: {
                connect: [{ id: user.id }],
            },
            adminUserIds: [user.id],
        },
    });
}

export async function getJoinedServersByUserId(userId: string) {
    const user = await db.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            joinedServers: true,
        },
        rejectOnNotFound: true,
    });

    return user.joinedServers;
}

export async function getServerByIdForUser({
    serverId,
    userId,
}: {
    serverId: string;
    userId: string;
}) {
    return await db.server.findFirst({
        where: {
            id: serverId,
            members: {
                some: {
                    id: userId,
                },
            },
        },
        rejectOnNotFound: true,
    });
}
