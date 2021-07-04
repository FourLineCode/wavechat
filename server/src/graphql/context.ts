import { PrismaClient, Session, User, UserRole } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Loader } from './loader';
import prisma from './prisma';
import { JWTPayload } from './resolvers/AuthResolver';

export interface Context {
	req: Request;
	res: Response;
	prisma: PrismaClient;
	public: boolean;
	authorized: boolean;
	user?: User;
	session?: Session;
	role?: UserRole;
	admin?: boolean;
	loader: Loader;
}

export const createContext = async ({ req, res }: ExpressContext): Promise<Context> => {
	let ctx: Context = {
		req: req,
		res: res,
		prisma: prisma,
		public: false,
		authorized: false,
		loader: new Loader(),
	};

	const token = req.cookies['session'];

	if (token) {
		const verified = jwt.verify(token, process.env.JWT_SECRET!);

		if (verified) {
			const { sessionId, userId } = jwt.decode(token) as JWTPayload;

			const session = await prisma.session.findFirst({
				where: {
					id: sessionId,
					userId: userId,
				},
				include: {
					user: true,
				},
			});

			if (session) {
				ctx.authorized = true;
				ctx.user = session.user;
				ctx.session = session;
				ctx.role = session.user.role;
				ctx.admin = session.user.role === 'ADMIN';
			}
		}
	}

	// TODO: add csrf token check to set public access to true
	ctx.public = true;

	return ctx;
};
