import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BarLoader } from 'react-spinners';
import { DiscoverUsersQuery, DiscoverUsersQueryVariables } from 'src/apollo/__generated__/types';
import { DiscoveredUser } from 'src/components/discover/DiscoveredUser';
import { DiscoverPageLayout } from 'src/components/discover/DiscoverPageLayout';
import { Button } from 'src/components/ui/Button';

export const GET_DISCOVER_USERS = gql`
	query DiscoverUsers($query: String!, $limit: Int, $cursor: Int) {
		discoverUsers(query: $query, limit: $limit, cursor: $cursor) {
			id
			pk
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
	const [users, setUsers] = useState<any[]>([]);
	const [queryTerm, setQueryTerm] = useState('');
	const [prevQueryTerm, setPrevQueryTerm] = useState('');
	const [currentCursor, setCurrentCursor] = useState<number | null>(null);
	const [paginationLoading, setPaginationLoading] = useState(false);

	const {
		data: searchData,
		refetch,
		loading,
	} = useQuery<DiscoverUsersQuery, DiscoverUsersQueryVariables>(GET_DISCOVER_USERS, {
		variables: {
			query: queryTerm,
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	useEffect(() => {
		if (prevQueryTerm === queryTerm) {
			setUsers(searchData ? [...users, ...searchData.discoverUsers] : users);
			return;
		}

		setUsers(searchData ? searchData.discoverUsers : []);
	}, [searchData]);

	useEffect(() => {
		setCurrentCursor(users[users.length - 1]?.pk ?? null);
	}, [users]);

	return (
		<DiscoverPageLayout
			title='Search for people you may know'
			placeholder='Username...'
			callback={async ({ searchTerm }) => {
				if (prevQueryTerm !== searchTerm) {
					setPrevQueryTerm(queryTerm);
				}
				setQueryTerm(searchTerm);

				if (searchTerm === '') {
					setUsers([]);
					return;
				}

				await refetch({ query: searchTerm });
			}}
		>
			{users.length > 0 && !loading ? (
				<>
					<div className='grid grid-cols-2 gap-2 overflow-y-auto 2xl:grid-cols-4'>
						{users.map((user) => (
							<DiscoveredUser user={user} key={user.id} searchTerm={queryTerm} />
						))}
					</div>
					<div className='flex justify-center'>
						<Button
							onClick={async () => {
								setPrevQueryTerm(queryTerm);
								setPaginationLoading(true);
								await refetch({ query: queryTerm, cursor: currentCursor });
								setPaginationLoading(false);
							}}
							type='submit'
							isSubmitting={paginationLoading}
							variant='outlined'
						>
							Load more
						</Button>
					</div>
				</>
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
