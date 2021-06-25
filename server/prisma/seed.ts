import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
	const user = await prisma.user.findFirst();

	if (user) return;

	await prisma.user.create({
		data: {
			email: 'akmal@wave.com',
			username: 'akmal',
			password: 'akmal123',
		},
	});
};

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
