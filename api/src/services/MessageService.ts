import { PrismaClient } from '@prisma/client';
import prismaConnection from 'prisma/connection';

let instance: MessageService;

export class MessageService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): MessageService {
		if (!instance) {
			instance = new MessageService(prismaConnection);
		}

		return instance;
	}

	public async getMessagesByThreadId(threadId: string) {
		return await this.db.message.findMany({
			where: { threadId },
		});
	}

	public async getMessagesByAuthorId(authorId: string) {
		return await this.db.message.findMany({
			where: { authorId },
		});
	}
}
