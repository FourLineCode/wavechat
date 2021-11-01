import { PrismaClient, User } from '@prisma/client';
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

	public async authorize(
		sessionToken: string
	): Promise<{ authorized: boolean; user: User | null }> {
		const verified = jwt.verify(sessionToken, process.env.JWT_SECRET!);

		if (!verified) return { authorized: false, user: null };

		const { sessionId, userId } = jwt.decode(sessionToken) as JWTPayload;

		const session = await this.db.session.findFirst({
			where: {
				id: sessionId,
				userId: userId,
			},
			include: {
				user: true,
			},
		});

		if (!session) {
			return { authorized: false, user: null };
		}

		return { authorized: true, user: session.user };
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
