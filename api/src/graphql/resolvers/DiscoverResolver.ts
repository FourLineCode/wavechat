import { builder } from 'src/graphql/builder';
import { UserObject } from 'src/graphql/resolvers/UserResolver';

builder.queryField('discoverUsers', (t) =>
	t.field({
		type: [UserObject],
		description: 'Gets random discoverable users for a client',
		authScopes: {
			user: true,
		},
		args: {
			query: t.arg({ type: 'String', required: true }),
			limit: t.arg({ type: 'Int', defaultValue: 12, required: true }),
			cursor: t.arg({ type: 'Int' }),
		},
		resolve: async (_parent, { query, limit, cursor }, { db }) => {
			query = query.trim();
			if (query === '') return [];

			const searchedUsers = await db.user.findMany({
				where: {
					OR: [
						{
							username: {
								contains: query,
								mode: 'insensitive',
							},
						},
						{
							displayName: {
								contains: query,
								mode: 'insensitive',
							},
						},
					],
				},
				take: limit,
				skip: cursor !== null && cursor !== undefined ? 1 : undefined,
				cursor:
					cursor !== null && cursor !== undefined
						? {
								pk: cursor,
						  }
						: undefined,
				orderBy: {
					pk: 'asc',
				},
			});

			return searchedUsers;
		},
	})
);
