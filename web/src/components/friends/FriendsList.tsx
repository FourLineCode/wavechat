import { gql, useQuery } from '@apollo/client';
import { BarLoader } from 'react-spinners';
import { Friendship, FriendsListQuery } from 'src/apollo/__generated__/types';
import { FriendListUserCard } from 'src/components/friends/FriendListUserCard';

export const GET_FRIENDS_LIST = gql`
	query FriendsList {
		friendsList {
			id
			firstUserId
			firstUser {
				id
				username
				displayName
				avatarUrl
				university
			}
			secondUserId
			secondUser {
				id
				username
				displayName
				avatarUrl
				university
			}
		}
	}
`;

export function FriendsList() {
	const { data, loading } = useQuery<FriendsListQuery>(GET_FRIENDS_LIST);

	return loading ? (
		<div className='flex justify-center h-full pt-16'>
			<BarLoader color='silver' speedMultiplier={1.5} />
		</div>
	) : (
		<div className='space-y-1'>
			{data && data?.friendsList.length > 0 ? (
				data?.friendsList.map((friendship) => (
					<FriendListUserCard friendship={friendship as Friendship} key={friendship.id} />
				))
			) : (
				<div className='mt-6 text-center text-secondary'>No Friends Found</div>
			)}
		</div>
	);
}
