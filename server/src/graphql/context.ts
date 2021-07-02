import { PrismaClient, Session, User, UserRole } from '@prisma/client';
import prisma from './prisma';

export interface Context {
	req: any;
	prisma: PrismaClient;
	authorized: boolean;
	user?: User;
	session?: Session;
	role?: UserRole;
	admin?: boolean;
}

export const createContext = async ({ req }: { req: any }): Promise<Context> => {
	return { req: req, prisma: prisma, authorized: false };
};
