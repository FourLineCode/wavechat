import { User } from "@prisma/client";
import argon2 from "argon2";
import { db } from "prisma/connection";

export async function getAllUsers() {
  return await db.user.findMany();
}

export async function getUserById(userId: string) {
  return await db.user.findFirst({
    where: { id: userId },
    rejectOnNotFound: true,
  });
}

export async function getUsersByIdList(userIds: string[]) {
  return await db.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
}

export async function getUserByUsername(username: string) {
  return await db.user.findFirst({
    where: { username: username },
    rejectOnNotFound: true,
  });
}

export async function userExistWithUsernameOrEmail({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const existentUser = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  return !!existentUser;
}

export async function createNewUser(input: User) {
  return await db.user.create({
    data: {
      email: input.email,
      username: input.username.toLowerCase(),
      displayName: input.username,
      password: await argon2.hash(input.password),
      bio: input.bio,
      university: input.university,
      department: input.department,
      semester: input.semester,
    },
  });
}

export async function findUserByEmail(email: string) {
  return await db.user.findFirst({
    where: { email },
    rejectOnNotFound: true,
  });
}

export async function updateUser(userId: string, input: Partial<User>) {
  if (input.displayName) {
    const user = await db.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    input.displayName = input.displayName.trim();
    if (input.displayName.toLowerCase() !== user.username) {
      throw new Error("Display name must be same as username (Case insensitive)");
    }
  }

  return await db.user.update({
    where: { id: userId },
    data: { ...input },
  });
}
