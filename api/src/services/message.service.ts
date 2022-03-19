import { MessageDTO } from "@wavechat/shared";
import { db } from "prisma/connection";

interface MessageThreadParams {
    threadId: string;
    userId: string;
}

export async function getMessagesByThreadId(threadId: string) {
    return await db.message.findMany({
        where: { threadId },
    });
}

export async function getUserThreadMessages({ threadId, userId }: MessageThreadParams) {
    const thread = await db.messageThread.findFirst({
        where: {
            id: threadId,
            participants: {
                some: {
                    userId,
                },
            },
        },
        include: {
            messages: true,
        },
        rejectOnNotFound: true,
    });

    return thread.messages;
}

export async function getMessagesByAuthorId(authorId: string) {
    return await db.message.findMany({
        where: { authorId },
    });
}

export async function createMessage(messageDTO: MessageDTO) {
    await db.user.findFirst({
        where: { id: messageDTO.authorId },
        rejectOnNotFound: true,
    });

    // TODO: do we want users to be friends to send messages?
    // const thread = await services.messageThread.getThreadById({
    //     threadId: messageDTO.threadId,
    //     userId: messageDTO.authorId,
    // });
    //
    // TODO: change legacy relation code
    // const isFriend = await services.friendship.doesFriendshipExist({
    //     firstUserId: thread.participants[0].id,
    //     secondUserId: thread.participants[1].id,
    // });
    // if (!isFriend) {
    //     throw new Error("You cannot send messages to this user");
    // }

    const [message, _thread] = await db.$transaction([
        db.message.create({
            data: {
                body: messageDTO.body,
                attachments: messageDTO.attachments && {
                    createMany: {
                        data: [...messageDTO.attachments],
                    },
                },
                threadId: messageDTO.threadId,
                authorId: messageDTO.authorId,
                createdAt: messageDTO.createdAt,
                updatedAt: messageDTO.updatedAt,
            },
        }),
        db.messageThread.update({
            where: { id: messageDTO.threadId },
            data: {
                updatedAt: new Date().toISOString(),
            },
        }),
    ]);

    return message;
}
