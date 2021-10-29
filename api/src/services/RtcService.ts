import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prismaConnection from 'prisma/connection';
import { JWTPayload } from 'src/graphql/resolvers/AuthResolver';
import { services } from 'src/services';

let instance: RtcService;

export class RtcService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): RtcService {
		if (!instance) {
			instance = new RtcService(prismaConnection);
		}

		return instance;
	}

	public async authorize(sessionToken: string): Promise<boolean> {
		const verified = jwt.verify(sessionToken, process.env.INTERNAL_SECRET!);

		if (!verified) return false;

		const { sessionId, userId } = jwt.decode(sessionToken) as JWTPayload;

		const session = await this.db.session.findFirst({
			where: {
				id: sessionId,
				userId: userId,
			},
		});

		if (!session) {
			return false;
		}

		return true;
	}

	public async authorizeJoinRoom({
		threadId,
		userId,
	}: {
		threadId: string;
		userId: string;
	}): Promise<boolean> {
		const thread = await services.messageThreadService.getThreadById({ threadId, userId });

		return !!thread;
	}
}
