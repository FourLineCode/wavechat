import { PrismaClient } from '@prisma/client';
import prismaConnection from 'prisma/connection';

let instance: DiscoverService;

export class DiscoverService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): DiscoverService {
		if (!instance) {
			instance = new DiscoverService(prismaConnection);
		}

		return instance;
	}

	public async getDiscoverUsers({
		query,
		cursor,
		limit,
		userId,
	}: {
		query: string;
		cursor?: number | null;
		limit: number;
		userId: string;
	}) {
		if (!query) return [];

		return await this.db.user.findMany({
			where: {
				AND: [
					{
						OR: [
							{
								username: {
									contains: query,
									mode: 'insensitive',
								},
							},
							{
								displayName: {
									contains: query,
									mode: 'insensitive',
								},
							},
						],
					},
					{
						id: {
							not: userId,
						},
					},
				],
			},
			take: limit,
			skip: cursor !== null && cursor !== undefined ? 1 : undefined,
			cursor:
				cursor !== null && cursor !== undefined
					? {
							pk: cursor,
					  }
					: undefined,
			orderBy: {
				pk: 'asc',
			},
		});
	}
}
