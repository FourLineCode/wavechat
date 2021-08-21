import prisma from './prisma';

export class Loader {
	public async loadUserByIDs(ids: string[]) {
		return await prisma.user.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}
}
