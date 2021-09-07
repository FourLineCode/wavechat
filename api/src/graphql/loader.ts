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
}
