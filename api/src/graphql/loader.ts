import db from 'src/graphql/prisma';

// DataLoaders for different field resolvers
export class Loader {
	public async loadUserByIDs(ids: string[]) {
		return await db.user.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}

	public async loadMessageByIDs(ids: string[]) {
		return await db.message.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}

	public async loadMessageThreadByIDs(ids: string[]) {
		return await db.messageThread.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}
}
