import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new PrismaClient();

async function seed() {
	const user = await db.user.findFirst();

	if (user) return;

	await db.user.create({
		data: {
			email: 'akmal@wave.com',
			username: 'akmal',
			displayName: 'Akmal Hossain',
			password: bcrypt.hashSync(process.env.ADMIN_PASS!, 10),
			role: 'ADMIN',
			avatarUrl: 'https://avatars.githubusercontent.com/u/56719270?v=4',
			university: 'East West University',
			department: 'CSE',
			semester: 6,
		},
	});

	for (let i = 0; i < 20; i++) {
		await db.user.create({
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
		await db.$disconnect();
	});
