import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prismaConnection from 'prisma/connection';
import { services } from 'src/services';

let instance: AuthService;

export class AuthService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): AuthService {
		if (!instance) {
			instance = new AuthService(prismaConnection);
		}

		return instance;
	}

	public async signUp(input: User) {
		const userExists = await services.userService.userExistWithUsernameOrEmail({
			email: input.email,
			username: input.username.toLowerCase(),
		});
		if (userExists) {
			throw new Error('User already exists with given username or email');
		}

		const newUser = await services.userService.createNewUser(input);

		const session = await this.db.session.create({
			data: {
				userId: newUser.id,
			},
		});

		return { newUser, session };
	}

	public async validatePassword({
		password,
		hashedPassword,
	}: {
		password: string;
		hashedPassword: string;
	}) {
		return await bcrypt.compare(password, hashedPassword);
	}

	public async signIn({ email, password }: { email: string; password: string }) {
		const user = await services.userService.findUserByEmail(email);

		const validated = await this.validatePassword({ password, hashedPassword: user.password });
		if (!validated) {
			throw new Error('Invalid Credentials');
		}

		const session = await this.db.session.create({
			data: {
				userId: user.id,
			},
		});

		return { user, session };
	}

	public async signOut(sessionId: string) {
		await this.db.session.delete({ where: { id: sessionId } });
	}
}
