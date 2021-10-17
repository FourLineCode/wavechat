import { PrismaClient } from '@prisma/client';
import prismaConnection from 'prisma/connection';

let instance: SearchService;

export class SearchService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): SearchService {
		if (!instance) {
			instance = new SearchService(prismaConnection);
		}

		return instance;
	}

	public async getSearchedUsers({ queryTerm, userId }: { queryTerm: string; userId: string }) {
		if (!queryTerm) return [];

		const friendships = await this.db.friendship.findMany({
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
}
