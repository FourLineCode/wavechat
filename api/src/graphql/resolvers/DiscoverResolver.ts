import { builder } from '../builder';
import { UserObject } from './UserResolver';

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
			cursor: t.arg({ type: 'String' }),
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
				cursor: cursor
					? {
							id: cursor,
					  }
					: undefined,
				orderBy: {
					username: 'asc',
				},
			});

			return searchedUsers;
		},
	})
);
