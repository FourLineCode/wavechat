import faker from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const db = new PrismaClient();

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
      password: await argon2.hash(process.env.ADMIN_PASS!),
      role: "ADMIN",
      bio: "I made this website LLOOL",
      avatarUrl: "https://avatars.githubusercontent.com/u/56719270?v=4",
      university: "East West University",
      department: "CSE",
      semester: 6,
    },
  });

  // Helper function to create a fake user
  const createFakeUser = async (index: number) => {
    const name = faker.name.findName().split(" ").join("");
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        username: name.toLowerCase(),
        displayName: name,
        password: await argon2.hash(process.env.BOT_PASS!),
        bio: faker.lorem.sentences(2),
        avatarUrl: faker.internet.avatar(),
        university: faker.company.companyName(),
        department: faker.commerce.department(),
        semester: faker.datatype.number(16) + 1,
      },
    });

    if (index < 50 && index % 2 === 0) {
      // Create friendships
      await db.friendship.create({
        data: {
          firstUserId: admin.id,
          secondUserId: user.id,
        },
      });

      // Create fake message threads and populate with messages
      if (index % 5 === 0) {
        const thread = await db.messageThread.create({
          data: {
            participants: {
              create: [{ userId: admin.id }, { userId: user.id }],
            },
          },
        });

        await db.$transaction([
          db.message.createMany({
            data: [
              {
                body: "This is an example message #1",
                threadId: thread.id,
                authorId: user.id,
              },
              {
                body: "This is an example message #2",
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
    } else if (index < 50 && index % 2 !== 0) {
      // Send some requests
      await db.friendRequest.create({
        data: {
          fromUserId: user.id,
          toUserId: admin.id,
        },
      });
    }
  };

  // Create some fake accounts
  await Promise.all(Array.from({ length: 100 }).map((_, i) => createFakeUser(i)));

  // Create some bot accounts
  await Promise.all(
    Array.from({ length: 20 }).map(async (_, i) =>
      db.user.create({
        data: {
          email: `bot${i}@wave.com`,
          username: `bot${i}`,
          displayName: `BOT${i}`,
          password: await argon2.hash(process.env.BOT_PASS!),
          bio: faker.lorem.sentences(2),
          avatarUrl: faker.internet.avatar(),
          university: faker.company.companyName(),
          department: faker.commerce.department(),
          semester: faker.datatype.number(16) + 1,
        },
      })
    )
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
