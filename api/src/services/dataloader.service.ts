import { db } from "prisma/connection";

export async function loadUserByIDs(ids: string[]) {
	return await db.user.findMany({
		where: {
			id: {
				in: ids,
			},
		},
	});
}

export async function loadMessageByIDs(ids: string[]) {
	return await db.message.findMany({
		where: {
			id: {
				in: ids,
			},
		},
	});
}

export async function loadMessageThreadByIDs(ids: string[]) {
	return await db.messageThread.findMany({
		where: {
			id: {
				in: ids,
			},
		},
	});
}
