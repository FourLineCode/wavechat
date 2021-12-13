import { Session, User, UserRole } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "prisma/connection";
import { JWTPayload } from "src/graphql/resolvers/auth.resolver";

export interface Context {
	req: Request;
	res: Response;
	public: boolean;
	authorized: boolean;
	user?: User;
	session?: Session;
	role?: UserRole;
	admin: boolean;
	internal: boolean;
}

// Returns the context and authorized status for each request to the api
export async function createContext({ req, res }: ExpressContext): Promise<Context> {
	let ctx: Context = {
		req: req,
		res: res,
		public: false,
		authorized: false,
		admin: false,
		internal: false,
	};

	const token = req.cookies["session"] as string;

	if (token) {
		const verified = jwt.verify(token, process.env.JWT_SECRET!);

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
				ctx.admin = session.user.role === "ADMIN";
			}
		}
	}

	const internalToken = req.headers["internal-token"] as string;

	if (internalToken) {
		const verified = jwt.verify(internalToken, process.env.INTERNAL_SECRET!);

		// Request is sent from internal servers
		if (verified) {
			ctx.internal = true;
		}
	}

	// TODO: add csrf token check to set public access to true
	ctx.public = true;

	return ctx;
}
