import { builder } from "src/graphql/builder";
import { UserObject } from "src/graphql/resolvers/user.resolver";
import { services } from "src/services";

builder.queryField("discoverUsers", (t) =>
	t.field({
		type: [UserObject],
		description: "Gets random discoverable users for a client",
		authScopes: {
			user: true,
		},
		args: {
			query: t.arg({ type: "String", required: true }),
			limit: t.arg({ type: "Int", defaultValue: 12, required: true }),
			cursor: t.arg({ type: "Int" }),
		},
		resolve: async (_parent, { query, limit, cursor }, { user }) => {
			if (!user) throw new Error("Unauthorized");

			query = query.trim();

			return await services.discover.getDiscoverUsers({
				query,
				cursor,
				limit,
				userId: user.id,
			});
		},
	})
);
