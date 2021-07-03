import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const seed = async () => {
	const user = await prisma.user.findFirst();

	if (user) return;

	const newUser = await prisma.user.create({
		data: {
			email: 'akmal@wave.com',
			username: 'akmal',
			displayname: 'Akmal',
			password: bcrypt.hashSync(process.env.ADMIN_PASS!, 10),
			role: 'ADMIN',
			avatarUrl: 'https://avatars.githubusercontent.com/u/56719270?v=4',
			university: 'East West University',
			department: 'CSE',
			semester: 6,
		},
	});

	for (const _ of Array(10).keys()) {
		await prisma.session.create({
			data: {
				userId: newUser.id,
			},
		});
	}
};

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
