import db from './prisma';

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
