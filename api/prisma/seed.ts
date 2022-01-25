import faker from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getConfig } from "src/internal/config";

const db = new PrismaClient();
const config = getConfig();

async function seed() {
    const user = await db.user.findFirst();

    // If a user exists, database doesnt need seeding
    if (user) return;

    // Create Admin user account
    const admin = await db.user.create({
        data: {
            email: "akmal@wave.com",
            username: "akmal",
            displayName: "Akmal",
            password: bcrypt.hashSync(process.env.ADMIN_PASS!, config.hashSalt),
            role: "ADMIN",
            bio: "I made this website LLOOL",
            avatarUrl: "https://avatars.githubusercontent.com/u/56719270?v=4",
            university: "East West University",
            department: "CSE",
            semester: 6,
        },
    });

    // Create some fake accounts
    for (let i = 0; i < 100; i++) {
        const name = faker.name.findName().split(" ").join("");
        const user = await db.user.create({
            data: {
                email: faker.internet.email(),
                username: name.toLowerCase(),
                displayName: name,
                password: bcrypt.hashSync(process.env.BOT_PASS!, config.hashSalt),
                bio: faker.lorem.sentences(2),
                avatarUrl: faker.internet.avatar(),
                university: faker.company.companyName(),
                department: faker.commerce.department(),
                semester: faker.datatype.number(16) + 1,
            },
        });

        if (i < 50 && i % 2 === 0) {
            // Create friendships
            await db.friendship.create({
                data: {
                    firstUserId: admin.id,
                    secondUserId: user.id,
                },
            });

            // Create fake message threads and populate with messages
            if (i % 5 === 0) {
                const thread = await db.messageThread.create({
                    data: {
                        participants: {
                            connect: [{ id: admin.id }, { id: user.id }],
                        },
                    },
                });

                await db.$transaction([
                    db.message.createMany({
                        data: [
                            {
                                body: "Example message #1",
                                threadId: thread.id,
                                authorId: user.id,
                            },
                            {
                                body: "Example message #2",
                                threadId: thread.id,
                                authorId: user.id,
                            },
                        ],
                    }),
                    db.messageThread.update({
                        where: { id: thread.id },
                        data: {
                            updatedAt: new Date().toISOString(),
                        },
                    }),
                ]);
            }
        } else if (i < 50 && i % 2 !== 0) {
            // Send some requests
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
                password: bcrypt.hashSync(process.env.BOT_PASS!, config.hashSalt),
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
