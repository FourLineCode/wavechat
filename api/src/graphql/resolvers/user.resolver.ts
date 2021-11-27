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
