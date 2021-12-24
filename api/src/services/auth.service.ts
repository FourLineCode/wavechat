import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { db } from "prisma/connection";
import { getConfig } from "src/internal/config";
import { services } from "src/services";

export async function signUp(input: User) {
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
        },
    });

    return { newUser, session };
}

export async function signIn({ email, password }: { email: string; password: string }) {
    const user = await services.user.findUserByEmail(email);

    const validated = await validatePassword({ password, hashedPassword: user.password });
    if (!validated) {
        throw new Error("Invalid Credentials");
    }

    const session = await db.session.create({
        data: {
            userId: user.id,
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
    return await bcrypt.compare(password, hashedPassword);
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
    const config = getConfig();

    const hashed = await bcrypt.compare(oldPassword, user.password);
    if (!hashed) {
        throw new Error("Incorrect old password");
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            password: await bcrypt.hash(newPassword, config.hashSalt),
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
