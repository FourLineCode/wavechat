import { db } from 'prisma/connection';
import { services } from 'src/services';

interface MessageThreadParams {
	threadId: string;
	userId: string;
}

interface GetMessageThreadParams {
	userId: string;
	currentUserId: string;
}

export async function getThreadById({ threadId, userId }: MessageThreadParams) {
	return await db.messageThread.findFirst({
		where: {
			id: threadId,
			participants: {
				some: {
					id: userId,
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
					id: userId,
				},
			},
		},
	});
}

export async function getThreadParticipants(threadId: string) {
	const thread = await db.messageThread.findFirst({
		where: { id: threadId },
		include: {
			participants: true,
		},
		rejectOnNotFound: true,
	});

	return thread.participants;
}

export async function findExistingThread(participants: string[]) {
	return await db.messageThread.findFirst({
		where: {
			participants: {
				every: {
					id: {
						in: participants,
					},
				},
			},
		},
	});
}

export async function getOrCreateThread({ userId, currentUserId }: GetMessageThreadParams) {
	if (currentUserId === userId) {
		throw new Error('You cannot Message yourself');
	}

	const friendshipExists = await services.friendship.doesFriendshipExist({
		firstUserId: currentUserId,
		secondUserId: userId,
	});
	if (!friendshipExists) {
		throw new Error('You are not friends with this user');
	}

	const existingThread = await findExistingThread([userId, currentUserId]);
	if (existingThread) {
		return existingThread;
	}

	return await db.messageThread.create({
		data: {
			participants: {
				connect: [{ id: currentUserId }, { id: userId }],
			},
		},
	});
}

export async function getActiveThreads(userId: string) {
	const currentUser = await db.user.findFirst({
		where: { id: userId },
		include: {
			messageThreads: {
				include: { participants: true },
				orderBy: { updatedAt: 'desc' },
			},
			friends_forward: true,
			friends_inverse: true,
		},
		rejectOnNotFound: true,
	});

	const friendsIds = [
		...currentUser.friends_forward.map(({ firstUserId, secondUserId }) =>
			firstUserId !== userId ? firstUserId : secondUserId
		),
		...currentUser.friends_inverse.map(({ firstUserId, secondUserId }) =>
			firstUserId !== userId ? firstUserId : secondUserId
		),
	];

	const threads = currentUser.messageThreads.filter((thread) => {
		const id = thread.participants.filter(({ id }) => id !== userId)[0].id;
		return friendsIds.includes(id);
	});

	return threads;
}
