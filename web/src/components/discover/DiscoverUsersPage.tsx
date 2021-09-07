import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BarLoader } from 'react-spinners';
import { DiscoverUsersQuery, DiscoverUsersQueryVariables } from 'src/apollo/__generated__/types';
import { DiscoveredUser } from 'src/components/discover/DiscoveredUser';
import { DiscoverPageLayout } from 'src/components/discover/DiscoverPageLayout';
import { useAuth } from 'src/store/useAuth';

export const GET_DISCOVER_USERS = gql`
	query DiscoverUsers($query: String!) {
		discoverUsers(query: $query) {
			id
			displayName
			avatarUrl
			university
			friends {
				id
				firstUserId
				secondUserId
			}
			pendingRequests {
				id
				fromUserId
			}
		}
	}
`;

export function DiscoverUsersPage() {
	const currentUser = useAuth().user;
	const [users, setUsers] = useState<any[]>([]);
	const [queryTerm, setQueryTerm] = useState('');

	const { data, refetch, loading } = useQuery<DiscoverUsersQuery, DiscoverUsersQueryVariables>(
		GET_DISCOVER_USERS,
		{
			variables: {
				query: queryTerm,
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);

	useEffect(() => {
		setUsers(data ? data.discoverUsers : []);
	}, [data]);

	return (
		<DiscoverPageLayout
			title='Search for people you may know'
			placeholder='Username...'
			callback={async ({ searchTerm }) => {
				setQueryTerm(searchTerm);
				if (queryTerm === '') return;

				await refetch({ query: searchTerm });
			}}
		>
			{users.length > 0 && !loading ? (
				<div className='grid grid-cols-2 gap-2 overflow-y-auto 2xl:grid-cols-4'>
					{users.map(
						(user) =>
							user.id !== currentUser?.id && (
								<DiscoveredUser user={user} key={user.id} searchTerm={queryTerm} />
							)
					)}
				</div>
			) : (
				<div className='flex items-center justify-center flex-1'>
					{loading ? (
						<BarLoader color='silver' speedMultiplier={1.5} />
					) : queryTerm.length > 0 ? (
						<div className='text-4xl font-bold text-dark-500'>No user found</div>
					) : (
						<div className='text-4xl font-bold text-dark-500'>Search for a User</div>
					)}
				</div>
			)}
		</DiscoverPageLayout>
	);
}
