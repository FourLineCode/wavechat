import { PrismaClient } from '@prisma/client';

type NodeJsGlobal = typeof globalThis;

interface CustomNodeJsGlobal extends NodeJsGlobal {
	prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const db = global.prisma || new PrismaClient({ log: [] });

if (process.env.NODE_ENV === 'development') global.prisma = db;

export default db;
