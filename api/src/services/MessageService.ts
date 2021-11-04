import { PrismaClient } from '@prisma/client';
import { MessageDTO } from '@shared/types/message';
import prismaConnection from 'prisma/connection';
import { services } from 'src/services';

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

	public async getUserThreadMessages({ threadId, userId }: { threadId: string; userId: string }) {
		const thread = await this.db.messageThread.findFirst({
			where: {
				id: threadId,
				participants: {
					some: {
						id: userId,
					},
				},
			},
			include: {
				messages: true,
			},
			rejectOnNotFound: true,
		});

		return thread.messages;
	}

	public async getMessagesByAuthorId(authorId: string) {
		return await this.db.message.findMany({
			where: { authorId },
		});
	}

	public async createMessage(messageDTO: MessageDTO) {
		await this.db.user.findFirst({
			where: { id: messageDTO.authorId },
			rejectOnNotFound: true,
		});

		await services.messageThreadService.getThreadById({
			threadId: messageDTO.threadId,
			userId: messageDTO.authorId,
		});

		const [message, _thread] = await this.db.$transaction([
			this.db.message.create({
				data: {
					body: messageDTO.body,
					threadId: messageDTO.threadId,
					authorId: messageDTO.authorId,
					createdAt: messageDTO.createdAt,
					updatedAt: messageDTO.updatedAt,
				},
			}),
			this.db.messageThread.update({
				where: { id: messageDTO.threadId },
				data: {
					updatedAt: new Date().toISOString(),
				},
			}),
		]);

		return message;
	}
}
