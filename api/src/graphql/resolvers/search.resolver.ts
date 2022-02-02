import { builder } from "src/graphql/builder";
import { UserObject } from "src/graphql/resolvers/user.resolver";
import { services } from "src/services";

builder.queryField("searchFriends", (t) =>
    t.field({
        type: [UserObject],
        description: "Returns list of friends matching search term",
        authScopes: { user: true },
        args: { searchTerm: t.arg({ type: "String", required: true }) },
        resolve: async (_parent, { searchTerm }, { user }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            const queryTerm = searchTerm.trim().toLowerCase();

            return await services.search.getSearchedUsers({ queryTerm, userId: user.id });
        },
    })
);
