import { PrismaClient } from '@prisma/client';
import prismaConnection from 'prisma/connection';
import { services } from 'src/services';

let instance: MessageThreadService;

export class MessageThreadService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): MessageThreadService {
		if (!instance) {
			instance = new MessageThreadService(prismaConnection);
		}

		return instance;
	}

	public async getThreadById({ threadId, userId }: { threadId: string; userId: string }) {
		return await this.db.messageThread.findFirst({
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

	public async getThreadsByUserId(userId: string) {
		return await this.db.messageThread.findMany({
			where: {
				participants: {
					some: {
						id: userId,
					},
				},
			},
		});
	}

	public async getThreadParticipants(threadId: string) {
		const thread = await this.db.messageThread.findFirst({
			where: { id: threadId },
			include: {
				participants: true,
			},
			rejectOnNotFound: true,
		});

		return thread.participants;
	}

	public async findExistingThread(participants: string[]) {
		return await this.db.messageThread.findFirst({
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

	public async getOrCreateThread({
		userId,
		currentUserId,
	}: {
		userId: string;
		currentUserId: string;
	}) {
		if (currentUserId === userId) {
			throw new Error('You cannot Message yourself');
		}

		const friendshipExists = await services.friendshipService.doesFriendshipExist({
			firstUserId: currentUserId,
			secondUserId: userId,
		});
		if (!friendshipExists) {
			throw new Error('You are not friends with this user');
		}

		const existingThread = await this.findExistingThread([userId, currentUserId]);
		if (existingThread) {
			return existingThread;
		}

		return await this.db.messageThread.create({
			data: {
				participants: {
					connect: [{ id: currentUserId }, { id: userId }],
				},
			},
		});
	}

	public async getActiveThreads(userId: string) {
		const currentUser = await this.db.user.findFirst({
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
}
