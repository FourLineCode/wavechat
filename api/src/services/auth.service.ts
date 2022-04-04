import { User } from "@prisma/client";
import argon2 from "argon2";
import { Request } from "express";
import { db } from "prisma/connection";
import { services } from "src/services";

export async function signUp(req: Request, input: User) {
  const userExists = await services.user.userExistWithUsernameOrEmail({
    email: input.email,
    username: input.username.toLowerCase(),
  });
  if (userExists) {
    throw new Error("User already exists with given username or email");
  }

  const newUser = await services.user.createNewUser(input);

  const session = await db.session.create({
    data: {
      userId: newUser.id,
      userAgent: req.headers["user-agent"],
    },
  });

  return { newUser, session };
}

export async function signIn({
  req,
  email,
  password,
}: {
  req: Request;
  email: string;
  password: string;
}) {
  const user = await services.user.findUserByEmail(email);

  const validated = await validatePassword({ password, hashedPassword: user.password });
  if (!validated) {
    throw new Error("Invalid Credentials");
  }

  const session = await db.session.create({
    data: {
      userId: user.id,
      userAgent: req.headers["user-agent"],
    },
  });

  return { user, session };
}

export async function signOut(sessionId: string) {
  await db.session.delete({ where: { id: sessionId } });
}

export async function getSessionsForUser(userId: string) {
  const lastDate = new Date();
  lastDate.setMonth(lastDate.getMonth() - 1);

  return await db.session.findMany({
    where: {
      userId,
      createdAt: {
        gte: lastDate,
      },
    },
  });
}

export async function validatePassword({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) {
  return await argon2.verify(hashedPassword, password);
}

export async function changePassword({
  user,
  oldPassword,
  newPassword,
}: {
  user: User;
  oldPassword: string;
  newPassword: string;
}) {
  const hashed = await argon2.verify(user.password, oldPassword);
  if (!hashed) {
    throw new Error("Incorrect old password");
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      password: await argon2.hash(newPassword),
    },
  });
}

export async function removeOtherSessions({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: string;
}) {
  return await db.session.deleteMany({
    where: {
      userId,
      id: { not: sessionId },
    },
  });
}
