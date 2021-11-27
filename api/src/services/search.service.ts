import { db } from "prisma/connection";

interface SearchParams {
	queryTerm: string;
	userId: string;
}

export async function getSearchedUsers({ queryTerm, userId }: SearchParams) {
	if (!queryTerm) return [];

	const friendships = await db.friendship.findMany({
		where: {
			OR: [{ firstUserId: userId }, { secondUserId: userId }],
		},
		include: {
			firstUser: true,
			secondUser: true,
		},
	});

	const friends = friendships.map(({ firstUser, secondUser }) => {
		return firstUser.id !== userId ? firstUser : secondUser;
	});
	return friends.filter(
		({ username, displayName }) =>
			username.includes(queryTerm) || displayName.toLowerCase().includes(queryTerm)
	);
}
