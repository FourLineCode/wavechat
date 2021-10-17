import { PrismaClient } from '@prisma/client';
import prismaConnection from 'prisma/connection';

let instance: FriendshipService;

export class FriendshipService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): FriendshipService {
		if (!instance) {
			instance = new FriendshipService(prismaConnection);
		}

		return instance;
	}

	public async doesRequestExist({
		fromUserId,
		toUserId,
	}: {
		fromUserId: string;
		toUserId: string;
	}) {
		const existedRequest = await this.db.friendRequest.findFirst({
			where: { fromUserId, toUserId },
		});

		return !!existedRequest;
	}

	public async doesFriendshipExist({
		firstUserId,
		secondUserId,
	}: {
		firstUserId: string;
		secondUserId: string;
	}) {
		const existedFriendship = await this.db.friendship.findFirst({
			where: {
				OR: [
					{ firstUserId, secondUserId },
					{ firstUserId: secondUserId, secondUserId: firstUserId },
				],
			},
		});

		return !!existedFriendship;
	}

	public async sendReuqest({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) {
		if (fromUserId === toUserId) {
			throw new Error('You cannot send yourself friend request');
		}

		const requestExists = await this.doesRequestExist({ fromUserId, toUserId });
		if (requestExists) {
			throw new Error('You already sent a request to this user');
		}

		const friendshipExists = await this.doesFriendshipExist({
			firstUserId: fromUserId,
			secondUserId: toUserId,
		});
		if (friendshipExists) {
			throw new Error('You are already friends with this user');
		}

		return await this.db.friendRequest.create({
			data: { fromUserId, toUserId },
		});
	}

	public async unsendRequest({ requestId, ownerId }: { requestId: string; ownerId: string }) {
		const pendingRequest = await this.db.friendRequest.findFirst({
			where: { id: requestId, fromUserId: ownerId },
			rejectOnNotFound: true,
		});

		await this.db.friendRequest.delete({ where: { id: pendingRequest.id } });

		return true;
	}

	public async acceptRequest({ requestId, userId }: { requestId: string; userId: string }) {
		const pendingRequest = await this.db.friendRequest.findFirst({
			where: { id: requestId, toUserId: userId },
			rejectOnNotFound: true,
		});

		const newFriendship = await this.db.friendship.create({
			data: {
				firstUserId: pendingRequest.fromUserId,
				secondUserId: pendingRequest.toUserId,
			},
		});

		await this.db.friendRequest.delete({ where: { id: pendingRequest.id } });

		return newFriendship;
	}

	public async declineRequest({ requestId, userId }: { requestId: string; userId: string }) {
		const request = await this.db.friendRequest.findFirst({
			where: { id: requestId, toUserId: userId },
			rejectOnNotFound: true,
		});

		return await this.db.friendRequest.delete({ where: { id: request.id } });
	}

	public async declineAllRequests(userId: string) {
		await this.db.friendRequest.deleteMany({
			where: { toUserId: userId },
		});

		return true;
	}

	public async unfriend({ userId, currentUserId }: { userId: string; currentUserId: string }) {
		if (userId === currentUserId) {
			throw new Error('You cannot unfriend yourself');
		}

		const unfriend = await this.db.friendship.findFirst({
			where: {
				OR: [
					{ firstUserId: currentUserId, secondUserId: userId },
					{ firstUserId: userId, secondUserId: currentUserId },
				],
			},
			rejectOnNotFound: true,
		});

		await this.db.friendship.delete({ where: { id: unfriend.id } });

		return unfriend;
	}

	public async getFriendList(userId: string) {
		return await this.db.friendship.findMany({
			where: {
				OR: [{ firstUserId: userId }, { secondUserId: userId }],
			},
			orderBy: {
				updatedAt: 'asc',
			},
		});
	}

	public async isUserFriend({
		userId,
		currentUserId,
	}: {
		userId: string;
		currentUserId: string;
	}) {
		if (userId === currentUserId) {
			throw new Error('You cannot be friends with yourself');
		}

		const friendship = await this.db.friendship.findFirst({
			where: {
				OR: [
					{ firstUserId: currentUserId, secondUserId: userId },
					{ firstUserId: userId, secondUserId: currentUserId },
				],
			},
		});

		return !!friendship;
	}

	public async getPendingRequests(userId: string) {
		return await this.db.friendRequest.findMany({ where: { toUserId: userId } });
	}

	public async getSentRequests(userId: string) {
		return await this.db.friendRequest.findMany({ where: { fromUserId: userId } });
	}
}
