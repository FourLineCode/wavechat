import { builder } from 'src/graphql/builder';
import { UserObject } from 'src/graphql/resolvers/UserResolver';

builder.queryField('searchFriends', (t) =>
	t.field({
		type: [UserObject],
		description: 'Returns list of friends matching search term',
		authScopes: {
			user: true,
		},
		args: { searchTerm: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { searchTerm }, { db, user }) => {
			const queryTerm = searchTerm.trim().toLowerCase();
			if (!queryTerm) return [];

			const friendships = await db.friendship.findMany({
				where: {
					OR: [{ firstUserId: user?.id }, { secondUserId: user?.id }],
				},
				include: {
					firstUser: true,
					secondUser: true,
				},
			});

			const friends = friendships.map((f) =>
				f.firstUser.id !== user?.id ? f.firstUser : f.secondUser
			);
			return friends.filter(
				(friend) =>
					friend.username.includes(queryTerm) ||
					friend.displayName.toLowerCase().includes(queryTerm)
			);
		},
	})
);
