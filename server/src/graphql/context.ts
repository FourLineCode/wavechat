import { PrismaClient, Session, User, UserRole } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';
import { Request, Response } from 'express';
import { Loader } from './loader';
import prisma from './prisma';

export interface Context {
	req: Request;
	res: Response;
	prisma: PrismaClient;
	authorized: boolean;
	user?: User;
	session?: Session;
	role?: UserRole;
	admin?: boolean;
	loader: Loader;
}

export const createContext = async ({ req, res }: ExpressContext): Promise<Context> => {
	return { req: req, res: res, prisma: prisma, authorized: false, loader: new Loader() };
};
