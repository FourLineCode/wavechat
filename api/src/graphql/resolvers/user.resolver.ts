import { ObjectRef } from "@giraphql/core";
import { User } from "@prisma/client";
import { builder } from "src/graphql/builder";
import { SessionObject } from "src/graphql/resolvers/auth.resolver";
import { FriendRequestObject, FriendshipObject } from "src/graphql/resolvers/friendship.resolver";
import { MessageObject } from "src/graphql/resolvers/message.resolver";
import { MessageThreadObject } from "src/graphql/resolvers/messageThread.resolver";
import { services } from "src/services";

export const UserObject: ObjectRef<User, User> = builder.objectRef<User>("User").implement({
	name: "User",
	description: "User object type",
	fields: (t) => ({
		id: t.exposeID("id"),
		pk: t.exposeInt("pk"),
		createdAt: t.expose("createdAt", { type: "Date" }),
		updatedAt: t.expose("updatedAt", { type: "Date" }),
		email: t.exposeString("email"),
		username: t.exposeString("username"),
		displayName: t.exposeString("displayName"),
		role: t.exposeString("role"),
		bio: t.expose("bio", { type: "String", nullable: true }),
		avatarUrl: t.expose("avatarUrl", { type: "String", nullable: true }),
		university: t.exposeString("university", { nullable: true }),
		department: t.exposeString("department", { nullable: true }),
		semester: t.exposeInt("semester", { nullable: true }),
		sessions: t.field({
			type: [SessionObject],
			resolve: async (user) => {
				return await services.auth.getSessionsForUser(user.id);
			},
		}),
		friends: t.field({
			type: [FriendshipObject],
			resolve: async (user) => {
				return await services.friendship.getFriendList(user.id);
			},
		}),
		pendingRequests: t.field({
			type: [FriendRequestObject],
			resolve: async (user) => {
				return await services.friendship.getPendingRequests(user.id);
			},
		}),
		sentRequests: t.field({
			type: [FriendRequestObject],
			resolve: async (user) => {
				return await services.friendship.getSentRequests(user.id);
			},
		}),
		messages: t.field({
			type: [MessageObject],
			resolve: async (user) => {
				return await services.message.getMessagesByAuthorId(user.id);
			},
		}),
		messageThreads: t.field({
			type: [MessageThreadObject],
			resolve: async (user) => {
				return await services.messageThread.getThreadsByUserId(user.id);
			},
		}),
	}),
});

builder.queryField("allUsers", (t) =>
	t.field({
		type: [UserObject],
		description: "returns all users",
		authScopes: { admin: true },
		resolve: async () => {
			return await services.user.getAllUsers();
		},
	})
);

builder.queryField("user", (t) =>
	t.field({
		type: UserObject,
		description: "returns info for a user",
		authScopes: { user: true },
		args: { userId: t.arg({ type: "String", required: true }) },
		resolve: async (_parent, { userId }) => {
			return await services.user.getUserById(userId);
		},
	})
);

builder.queryField("userByUsername", (t) =>
	t.field({
		type: UserObject,
		description: "returns info for a user by username",
		authScopes: { user: true },
		args: { username: t.arg({ type: "String", required: true }) },
		resolve: async (_parent, { username }) => {
			return await services.user.getUserByUsername(username.toLowerCase());
		},
	})
);

const UpdateUserInput = builder.inputType("UpdateUserInput", {
	fields: (t) => ({
		displayName: t.string({
			validate: {
				minLength: [2, { message: "Display Name must be atleast 2 characters" }],
				maxLength: [32, { message: "Display Name can be up to 32 characters" }],
			},
		}),
		bio: t.string({
			validate: {
				minLength: [2, { message: "Bio is too short (minimum 2 characters)" }],
				maxLength: [256, { message: "Bio is too long (maximum 256 characters)" }],
			},
		}),
		avatarUrl: t.string({
			validate: {
				url: true,
			},
		}),
		university: t.string({
			validate: {
				minLength: [2, { message: "University name is too short" }],
				maxLength: [64, { message: "University name too long" }],
			},
		}),
		department: t.string({
			validate: {
				minLength: [2, { message: "Department name is too short" }],
				maxLength: [64, { message: "Department name too long" }],
			},
		}),
		semester: t.int({
			validate: {
				positive: true,
				min: [0, { message: "Semester must be in range 0-18" }],
				max: [18, { message: "Semester must be in range 0-18" }],
			},
		}),
	}),
});

builder.mutationField("updateUser", (t) =>
	t.field({
		type: UserObject,
		description: "Update info for a user",
		authScopes: { user: true },
		args: { input: t.arg({ type: UpdateUserInput, required: true }) },
		resolve: async (_parent, { input }, { user }) => {
			if (!user) throw new Error("Unauthorized");

			return await services.user.updateUser(user.id, input as Partial<User>);
		},
	})
);
