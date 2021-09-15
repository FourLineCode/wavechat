import { gql, useQuery } from '@apollo/client';
import { BarLoader } from 'react-spinners';
import { FriendRequest, PendingRequestsQuery } from 'src/apollo/__generated__/types';
import { FriendRequestCard } from 'src/components/friends/FriendRequestCard';

const GET_PENDING_REQUESTS = gql`
	query PendingRequests {
		pendingRequests {
			id
			fromUserId
			fromUser {
				id
				displayName
			}
			toUserId
			toUser {
				id
				displayName
			}
		}
	}
`;

export function Requestslist() {
	const { data, loading } = useQuery<PendingRequestsQuery>(GET_PENDING_REQUESTS);

	return loading ? (
		<div className='flex justify-center h-full pt-16'>
			<BarLoader color='silver' speedMultiplier={1.5} />
		</div>
	) : (
		<div className='space-y-2'>
			{data?.pendingRequests.map((request) => (
				<FriendRequestCard request={request as FriendRequest} />
			))}
		</div>
	);
}
