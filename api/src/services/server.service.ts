import { ServerType, User } from "@prisma/client";
import { db } from "prisma/connection";
import { services } from "src/services";

export interface ServerUserParams {
    serverId: string;
    userId: string;
}

export interface ServerInviteParams {
    serverId: string;
    fromUserId: string;
    toUserId: string;
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

export async function getServerByIdForUser({ serverId, userId }: ServerUserParams) {
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

export async function getInvitableUsersList({ serverId, userId }: ServerUserParams) {
    const friendshipList = await services.friendship.getFriendList(userId);
    const friendIdList = friendshipList.map(({ firstUserId, secondUserId }) =>
        firstUserId === userId ? secondUserId : firstUserId
    );

    const unfilteredInvitableUserIds = await Promise.all(
        friendIdList.map(async (friendId) => {
            const canInvite = await canInviteUserToServer({
                serverId,
                fromUserId: userId,
                toUserId: friendId,
            });
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
    fromUserId,
}: ServerInviteParams) {
    const [alreadyJoined, alreadyInvited] = await Promise.all([
        isUserInServer({ serverId, userId: toUserId }),
        isUserAlreadyInvited({ serverId, toUserId, fromUserId }),
    ]);

    return !(alreadyJoined || alreadyInvited);
}

export async function isUserInServer({ serverId, userId }: ServerUserParams) {
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

export async function isUserAlreadyInvited({ serverId, toUserId, fromUserId }: ServerInviteParams) {
    const userAlreadyInvited = await db.serverInvite.findFirst({
        where: {
            serverId: serverId,
            fromUserId: fromUserId,
            toUserId: toUserId,
        },
    });

    return !!userAlreadyInvited;
}

export async function inviteUserToServerById({
    serverId,
    fromUserId,
    toUserId,
}: ServerInviteParams) {
    const canInvite = await canInviteUserToServer({ serverId, fromUserId, toUserId });
    if (!canInvite) {
        throw new Error("Cannot invite user to the server");
    }

    return await db.serverInvite.create({
        data: {
            serverId,
            fromUserId,
            toUserId,
        },
    });
}

export async function inviteUserToServerByUsername({
    serverId,
    userId,
    username,
}: ServerUserParams & { username: string }) {
    const toUser = await db.user.findUnique({
        where: {
            username: username,
        },
        rejectOnNotFound: true,
    });

    const canInvite = await canInviteUserToServer({
        serverId,
        fromUserId: userId,
        toUserId: toUser.id,
    });
    if (!canInvite) {
        throw new Error("Cannot invite user to the server");
    }

    return await db.serverInvite.create({
        data: {
            serverId,
            fromUserId: userId,
            toUserId: toUser.id,
        },
    });
}

export async function deleteInviteToUserById({
    serverId,
    fromUserId,
    toUserId,
}: ServerInviteParams) {
    const invite = await db.serverInvite.findFirst({
        where: {
            serverId,
            fromUserId,
            toUserId,
        },
        rejectOnNotFound: true,
    });

    return await db.serverInvite.delete({
        where: {
            id: invite.id,
        },
    });
}
