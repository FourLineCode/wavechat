import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { db } from "prisma/connection";
import { getConfig } from "src/internal/config";

export async function getAllUsers() {
    return await db.user.findMany();
}

export async function getUserById(userId: string) {
    return await db.user.findFirst({
        where: { id: userId },
        rejectOnNotFound: true,
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
    const config = getConfig();
    return await db.user.create({
        data: {
            email: input.email,
            username: input.username.toLowerCase(),
            displayName: input.username,
            password: await bcrypt.hash(input.password, config.hashSalt),
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
    return await db.user.update({
        where: { id: userId },
        data: { ...input },
    });
}
