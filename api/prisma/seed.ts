import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import faker from 'faker';

const db = new PrismaClient();

async function seed() {
	const user = await db.user.findFirst();

	// If a user exists, database doesnt need seeding
	if (user) return;

	// Create Admin user account for testing purposes
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

	// Create some bot accounts for testing purposes
	for (let i = 0; i < 50; i++) {
		const name = faker.name.findName();
		await db.user.create({
			data: {
				email: faker.internet.email(),
				username: name.split(' ').join('').toLowerCase(),
				displayName: name,
				password: bcrypt.hashSync(process.env.BOT_PASS!, 10),
				avatarUrl: faker.internet.avatar(),
				university: faker.company.companyName(),
				department: faker.commerce.department(),
				semester: faker.datatype.number(12),
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
