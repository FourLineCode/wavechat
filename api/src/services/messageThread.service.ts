import { db } from "prisma/connection";
import { services } from "src/services";

interface MessageThreadParams {
  threadId: string;
  userId: string;
}

interface GetMessageThreadParams {
  userId: string;
  currentUserId: string;
}

export async function getThreadByThreadId(threadId: string) {
  return await db.messageThread.findFirst({
    where: {
      id: threadId,
    },
    rejectOnNotFound: true,
  });
}

export async function getThreadById({ threadId, userId }: MessageThreadParams) {
  return await db.messageThread.findFirst({
    where: {
      id: threadId,
      participants: {
        some: {
          userId,
        },
      },
    },
    include: { participants: true },
    rejectOnNotFound: true,
  });
}

export async function getThreadsByUserId(userId: string) {
  return await db.messageThread.findMany({
    where: {
      participants: {
        some: {
          userId,
        },
      },
    },
  });
}

export async function getThreadParticipants(threadId: string) {
  const thread = await db.messageThread.findFirst({
    where: { id: threadId },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
    rejectOnNotFound: true,
  });

  return thread.participants.map(({ user }) => user);
}

export async function findExistingThread(participants: string[]) {
  return await db.messageThread.findFirst({
    where: {
      participants: {
        every: {
          userId: {
            in: participants,
          },
        },
      },
    },
  });
}

export async function getOrCreateThread({ userId, currentUserId }: GetMessageThreadParams) {
  if (currentUserId === userId) {
    throw new Error("You cannot Message yourself");
  }

  const friendshipExists = await services.friendship.doesFriendshipExist({
    firstUserId: currentUserId,
    secondUserId: userId,
  });
  if (!friendshipExists) {
    throw new Error("You are not friends with this user");
  }

  const existingThread = await findExistingThread([userId, currentUserId]);
  if (existingThread) {
    return existingThread;
  }

  return await db.messageThread.create({
    data: {
      participants: {
        create: [{ userId: currentUserId }, { userId: userId }],
      },
    },
  });
}

export async function getActiveThreads(userId: string) {
  const currentUser = await db.user.findFirst({
    where: { id: userId },
    include: {
      messageThreads: {
        include: {
          user: true,
          messageThread: true,
        },
        orderBy: { updatedAt: "desc" },
      },
      friendsForward: true,
      friendsInverse: true,
    },
    rejectOnNotFound: true,
  });

  // TODO: do we want users to be friends to show the active thread?
  // const friendsIds = [
  //     ...currentUser.friendsForward.map(({ firstUserId, secondUserId }) =>
  //         firstUserId !== userId ? firstUserId : secondUserId
  //     ),
  //     ...currentUser.friendsInverse.map(({ firstUserId, secondUserId }) =>
  //         firstUserId !== userId ? firstUserId : secondUserId
  //     ),
  // ];
  //
  // TODO: change legacy relation code
  // const threads = currentUser.messageThreads.filter((thread) => {
  //     const id = thread.participants.filter(({ id }) => id !== userId)[0].id;
  //     return friendsIds.includes(id);
  // });

  return currentUser.messageThreads.map(({ messageThread }) => messageThread);
}
