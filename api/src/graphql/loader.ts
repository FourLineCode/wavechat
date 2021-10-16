import prismaConnection from 'prisma/connection';

// DataLoaders for different field resolvers
export class Loader {
	public async loadUserByIDs(ids: string[]) {
		return await prismaConnection.user.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}

	public async loadMessageByIDs(ids: string[]) {
		return await prismaConnection.message.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}

	public async loadMessageThreadByIDs(ids: string[]) {
		return await prismaConnection.messageThread.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}
}
