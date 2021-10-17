import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prismaConnection from 'prisma/connection';

let instance: UserService;

export class UserService {
	private db: PrismaClient;

	public constructor(db: PrismaClient) {
		this.db = db;
	}

	public static getInstance(): UserService {
		if (!instance) {
			instance = new UserService(prismaConnection);
		}

		return instance;
	}

	public async getAllUsers() {
		return await this.db.user.findMany();
	}

	public async getUserById(userId: string) {
		return await this.db.user.findFirst({
			where: { id: userId },
			rejectOnNotFound: true,
		});
	}

	public async userExistWithUsernameOrEmail({
		email,
		username,
	}: {
		email: string;
		username: string;
	}) {
		const existentUser = await this.db.user.findFirst({
			where: {
				OR: [{ email }, { username }],
			},
		});
		console.log(existentUser);
		return !!existentUser;
	}

	public async createNewUser(input: User) {
		return await this.db.user.create({
			data: {
				email: input.email,
				username: input.username.toLowerCase(),
				displayName: input.username,
				password: await bcrypt.hash(input.password, 11),
				bio: input.bio,
				university: input.university,
				department: input.department,
				semester: input.semester,
			},
		});
	}

	public async findUserByEmail(email: string) {
		return await this.db.user.findFirst({
			where: { email },
			rejectOnNotFound: true,
		});
	}
}
