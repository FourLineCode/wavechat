import { PrismaClient } from '@prisma/client';
import prismaConnection from 'prisma/connection';

let instance: DataLoaderService;

// DataLoaders for different field resolvers
export class DataLoaderService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): DataLoaderService {
		if (!instance) {
			instance = new DataLoaderService(prismaConnection);
		}

		return instance;
	}

	public async loadUserByIDs(ids: string[]) {
		return await this.db.user.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}

	public async loadMessageByIDs(ids: string[]) {
		return await this.db.message.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}

	public async loadMessageThreadByIDs(ids: string[]) {
		return await this.db.messageThread.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}
}
