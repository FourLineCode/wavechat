import { gql } from '@apollo/client';
import { useState } from 'react';
import { client } from 'src/apollo/client';
import {
	DiscoverUsersQuery,
	DiscoverUsersQueryVariables,
	User,
} from 'src/apollo/__generated__/types';
import { DiscoveredUser } from 'src/components/discover/DiscoveredUser';
import { DiscoverPageLayout } from 'src/components/discover/DiscoverPageLayout';

export function DiscoverUsersPage() {
	const [users, setUsers] = useState<Partial<User>[]>([]);
	const [loading, setLoading] = useState(false);

	return (
		<DiscoverPageLayout
			title='Search for people you may know'
			placeholder='Username...'
			callback={async ({ searchTerm }) => {
				// TODO: paginate this
				setLoading(true);
				const { data } = await client.query<
					DiscoverUsersQuery,
					DiscoverUsersQueryVariables
				>({
					query: gql`
						query DiscoverUsers($query: String!) {
							discoverUsers(query: $query) {
								id
								displayName
								avatarUrl
								university
							}
						}
					`,

					variables: {
						query: searchTerm,
					},
				});
				setLoading(false);

				if (data) {
					setUsers(data?.discoverUsers);
				} else {
					setUsers([]);
				}
			}}
		>
			{users.length > 0 && !loading ? (
				<div className='grid grid-cols-2 gap-2 overflow-y-auto 2xl:grid-cols-4'>
					{users.map((user) => (
						<DiscoveredUser user={user} key={user.id} />
					))}
				</div>
			) : (
				<div className='flex items-center justify-center flex-1'>
					{loading ? (
						<div className='text-4xl spinner'></div>
					) : (
						<div className='text-4xl font-bold text-dark-500'>Search for a User</div>
					)}
				</div>
			)}
		</DiscoverPageLayout>
	);
}
