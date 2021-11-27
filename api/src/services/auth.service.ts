import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { db } from 'prisma/connection';
import { services } from 'src/services';

export async function signUp(input: User) {
	const userExists = await services.user.userExistWithUsernameOrEmail({
		email: input.email,
		username: input.username.toLowerCase(),
	});
	if (userExists) {
		throw new Error('User already exists with given username or email');
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
		throw new Error('Invalid Credentials');
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
	return await db.session.findMany({ where: { userId } });
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
