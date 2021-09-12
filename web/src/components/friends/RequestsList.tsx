import { gql, useQuery } from '@apollo/client';
import { BarLoader } from 'react-spinners';
import { PendingRequestsQuery } from 'src/apollo/__generated__/types';

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

	return (
		<div>
			{loading ? (
				<BarLoader color='white' />
			) : (
				data?.pendingRequests.map((request) => <div>{request.fromUser.displayName}</div>)
			)}
		</div>
	);
}
