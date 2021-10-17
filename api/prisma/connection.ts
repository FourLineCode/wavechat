import { PrismaClient } from '@prisma/client';

/* This makes sure that there is only one instance of PrismaClient being used throughout the server */

type NodeJsGlobal = typeof globalThis;

interface CustomNodeJsGlobal extends NodeJsGlobal {
	prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prismaConnection = global.prisma || new PrismaClient({ log: [] });

if (process.env.NODE_ENV === 'development') global.prisma = prismaConnection;

export default prismaConnection;