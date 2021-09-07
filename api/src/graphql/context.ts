import { PrismaClient, Session, User, UserRole } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Loader } from 'src/graphql/loader';
import db from 'src/graphql/prisma';
import { JWTPayload } from 'src/graphql/resolvers/AuthResolver';

export interface Context {
	req: Request;
	res: Response;
	db: PrismaClient;
	public: boolean;
	authorized: boolean;
	user?: User;
	session?: Session;
	role?: UserRole;
	admin?: boolean;
	loader: Loader;
}

// Returns the context and authorized status for each request to the api
export async function createContext({ req, res }: ExpressContext): Promise<Context> {
	let ctx: Context = {
		req: req,
		res: res,
		db: db,
		public: false,
		authorized: false,
		loader: new Loader(),
	};

	// Read http only session cookie from request headers
	const token = req.cookies['session'];

	if (token) {
		const verified = jwt.verify(token, process.env.JWT_SECRET!);

		// User is verified
		if (verified) {
			const { sessionId, userId } = jwt.decode(token) as JWTPayload;

			const session = await db.session.findFirst({
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
}
