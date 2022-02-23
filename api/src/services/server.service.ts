import { ServerType, User } from "@prisma/client";
import { db } from "prisma/connection";
import { services } from "src/services";

export interface ServerUserQueryParams {
    serverId: string;
    userId: string;
}

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

export async function getServerByIdForUser({ serverId, userId }: ServerUserQueryParams) {
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

export async function getServerChannelsByServerId(serverId: string) {
    return await db.serverChannel.findMany({
        where: {
            serverId: serverId,
        },
    });
}

export async function getInvitableUsersList({ serverId, userId }: ServerUserQueryParams) {
    const friendshipList = await services.friendship.getFriendList(userId);
    const friendIdList = friendshipList.map(({ firstUserId, secondUserId }) =>
        firstUserId === userId ? secondUserId : firstUserId
    );

    const unfilteredInvitableUserIds = await Promise.all(
        friendIdList.map(async (friendId) => {
            const canInvite = await canInviteUserToServer({ serverId, userId, toUserId: friendId });
            if (canInvite) {
                return friendId;
            }
        })
    );

    const invitableUserIds = unfilteredInvitableUserIds.filter(Boolean) as string[];

    return await db.user.findMany({
        where: {
            id: {
                in: invitableUserIds,
            },
        },
    });
}

export async function canInviteUserToServer({
    serverId,
    toUserId,
    userId,
}: ServerUserQueryParams & { toUserId: string }) {
    const [alreadyJoined, alreadyInvited] = await Promise.all([
        isUserInServer({ serverId, userId: toUserId }),
        isUserAlreadyInvited({ serverId, toUserId, userId }),
    ]);

    return !(alreadyJoined || alreadyInvited);
}

export async function isUserInServer({ serverId, userId }: ServerUserQueryParams) {
    const userInServer = await db.server.findFirst({
        where: {
            id: serverId,
            members: {
                some: {
                    id: userId,
                },
            },
        },
    });

    return !!userInServer;
}

export async function isUserAlreadyInvited({
    serverId,
    toUserId,
    userId,
}: ServerUserQueryParams & { toUserId: string }) {
    const userAlreadyInvited = await db.serverInvite.findFirst({
        where: {
            serverId: serverId,
            fromUserId: userId,
            toUserId: toUserId,
        },
    });

    return !!userAlreadyInvited;
}
