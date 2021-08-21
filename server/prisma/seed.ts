import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
	const user = await prisma.user.findFirst();

	if (user) return;

	await prisma.user.create({
		data: {
			email: 'akmal@wave.com',
			username: 'akmal',
			displayName: 'Akmal',
			password: bcrypt.hashSync(process.env.ADMIN_PASS!, 10),
			role: 'ADMIN',
			avatarUrl: 'https://avatars.githubusercontent.com/u/56719270?v=4',
			university: 'East West University',
			department: 'CSE',
			semester: 6,
		},
	});

	for (let i = 0; i < 10; i++) {
		await prisma.user.create({
			data: {
				email: `bot${i}@wave.com`,
				username: `bot${i}`,
				displayName: `Bot${i}`,
				password: bcrypt.hashSync(process.env.BOT_PASS!, 10),
			},
		});
	}
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
