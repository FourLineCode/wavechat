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
		resolve: async (_parent, { query, limit, cursor }, { prisma }) => {
			const searchedUsers = await prisma.user.findMany({
				where: {
					username: {
						contains: query,
					},
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
