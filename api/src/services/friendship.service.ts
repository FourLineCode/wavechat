import { db } from 'prisma/connection';

interface FriendshipParams {
	firstUserId: string;
	secondUserId: string;
}

interface FriendshipMutationParams {
	userId: string;
	currentUserId: string;
}

interface RequestParams {
	fromUserId: string;
	toUserId: string;
}

interface RespondRequestParams {
	requestId: string;
	userId: string;
}

export async function doesFriendshipExist({ firstUserId, secondUserId }: FriendshipParams) {
	const existedFriendship = await db.friendship.findFirst({
		where: {
			OR: [
				{ firstUserId, secondUserId },
				{ firstUserId: secondUserId, secondUserId: firstUserId },
			],
		},
	});

	return !!existedFriendship;
}

export async function doesRequestExist({ fromUserId, toUserId }: RequestParams) {
	const existedRequest = await db.friendRequest.findFirst({
		where: { fromUserId, toUserId },
	});

	return !!existedRequest;
}

export async function sendReuqest({ fromUserId, toUserId }: RequestParams) {
	if (fromUserId === toUserId) {
		throw new Error('You cannot send yourself friend request');
	}

	const requestExists = await doesRequestExist({ fromUserId, toUserId });
	if (requestExists) {
		throw new Error('You already sent a request to this user');
	}

	const friendshipExists = await doesFriendshipExist({
		firstUserId: fromUserId,
		secondUserId: toUserId,
	});
	if (friendshipExists) {
		throw new Error('You are already friends with this user');
	}

	return await db.friendRequest.create({
		data: { fromUserId, toUserId },
	});
}

export async function unsendRequest({ requestId, userId }: RespondRequestParams) {
	const pendingRequest = await db.friendRequest.findFirst({
		where: { id: requestId, fromUserId: userId },
		rejectOnNotFound: true,
	});

	await db.friendRequest.delete({ where: { id: pendingRequest.id } });

	return true;
}

export async function acceptRequest({ requestId, userId }: RespondRequestParams) {
	const pendingRequest = await db.friendRequest.findFirst({
		where: { id: requestId, toUserId: userId },
		rejectOnNotFound: true,
	});

	const newFriendship = await db.friendship.create({
		data: {
			firstUserId: pendingRequest.fromUserId,
			secondUserId: pendingRequest.toUserId,
		},
	});

	await db.friendRequest.delete({ where: { id: pendingRequest.id } });

	return newFriendship;
}

export async function declineRequest({ requestId, userId }: RespondRequestParams) {
	const request = await db.friendRequest.findFirst({
		where: { id: requestId, toUserId: userId },
		rejectOnNotFound: true,
	});

	return await db.friendRequest.delete({ where: { id: request.id } });
}

export async function declineAllRequests(userId: string) {
	await db.friendRequest.deleteMany({
		where: { toUserId: userId },
	});

	return true;
}

export async function unfriend({ userId, currentUserId }: FriendshipMutationParams) {
	if (userId === currentUserId) {
		throw new Error('You cannot unfriend yourself');
	}

	const unfriend = await db.friendship.findFirst({
		where: {
			OR: [
				{ firstUserId: currentUserId, secondUserId: userId },
				{ firstUserId: userId, secondUserId: currentUserId },
			],
		},
		rejectOnNotFound: true,
	});

	await db.friendship.delete({ where: { id: unfriend.id } });

	return unfriend;
}

export async function isUserFriend({ userId, currentUserId }: FriendshipMutationParams) {
	if (userId === currentUserId) {
		throw new Error('You cannot be friends with yourself');
	}

	const friendship = await db.friendship.findFirst({
		where: {
			OR: [
				{ firstUserId: currentUserId, secondUserId: userId },
				{ firstUserId: userId, secondUserId: currentUserId },
			],
		},
	});

	return !!friendship;
}

export async function getFriendList(userId: string) {
	return await db.friendship.findMany({
		where: {
			OR: [{ firstUserId: userId }, { secondUserId: userId }],
		},
		orderBy: {
			updatedAt: 'asc',
		},
	});
}

export async function getPendingRequests(userId: string) {
	return await db.friendRequest.findMany({ where: { toUserId: userId } });
}

export async function getSentRequests(userId: string) {
	return await db.friendRequest.findMany({ where: { fromUserId: userId } });
}
