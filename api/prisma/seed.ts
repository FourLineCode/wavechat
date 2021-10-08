import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import faker from 'faker';

const db = new PrismaClient();

async function seed() {
	const user = await db.user.findFirst();

	// If a user exists, database doesnt need seeding
	if (user) return;

	// Create Admin user account
	const admin = await db.user.create({
		data: {
			email: 'akmal@wave.com',
			username: 'akmal',
			displayName: 'Akmal Hossain',
			password: bcrypt.hashSync(process.env.ADMIN_PASS!, 12),
			role: 'ADMIN',
			bio: 'I made this website LLOOL',
			avatarUrl: 'https://avatars.githubusercontent.com/u/56719270?v=4',
			university: 'East West University',
			department: 'CSE',
			semester: 6,
		},
	});

	// Create some fake accounts
	for (let i = 0; i < 50; i++) {
		const name = faker.name.findName();
		const user = await db.user.create({
			data: {
				email: faker.internet.email(),
				username: name.split(' ').join('').toLowerCase(),
				displayName: name,
				password: bcrypt.hashSync(process.env.BOT_PASS!, 10),
				bio: faker.lorem.sentences(2),
				avatarUrl: faker.internet.avatar(),
				university: faker.company.companyName(),
				department: faker.commerce.department(),
				semester: faker.datatype.number(16) + 1,
			},
		});

		if (i < 20 && i % 2 === 0) {
			await db.friendship.create({
				data: {
					firstUserId: admin.id,
					secondUserId: user.id,
				},
			});

			if (i % 4 === 0) {
				const thread = await db.messageThread.create({
					data: {
						participants: {
							connect: [{ id: admin.id }, { id: user.id }],
						},
						messages: {
							createMany: {
								data: [
									{ body: `Example User Message ${i}`, authorId: user.id },
									{ body: `Example Admin Message ${i}`, authorId: admin.id },
									{ body: `Example User Message ${i}`, authorId: user.id },
								],
							},
						},
					},
				});

				await db.message.create({
					data: {
						body: `Test message ${i} - [Extra]`,
						authorId: user.id,
						threadId: thread.id,
					},
				});
			}
		} else if (i < 20 && i % 2 !== 0) {
			await db.friendRequest.create({
				data: {
					fromUserId: user.id,
					toUserId: admin.id,
				},
			});
		}
	}

	// Create some bot accounts
	for (let i = 0; i < 20; i++) {
		await db.user.create({
			data: {
				email: `bot${i}@wave.com`,
				username: `bot${i}`,
				displayName: `BOT${i}`,
				password: bcrypt.hashSync(process.env.BOT_PASS!, 10),
				bio: faker.lorem.sentences(2),
				avatarUrl: faker.internet.avatar(),
				university: faker.company.companyName(),
				department: faker.commerce.department(),
				semester: faker.datatype.number(16) + 1,
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
