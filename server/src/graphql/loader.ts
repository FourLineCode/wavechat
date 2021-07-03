import prisma from './prisma';

export class Loader {
	public loadUserByIDs = async (ids: string[]) => {
		return await prisma.user.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	};
}
