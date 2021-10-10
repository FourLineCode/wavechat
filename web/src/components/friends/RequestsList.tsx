import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import toast from 'react-hot-toast';
import { BarLoader } from 'react-spinners';
import { FriendRequest, PendingRequestsQuery } from 'src/apollo/__generated__/types';
import { FriendRequestCard } from 'src/components/friends/FriendRequestCard';
import { Button } from 'src/components/ui/Button';
import { Modal } from 'src/components/ui/Modal';
import { useModal } from 'src/hooks/useModal';

export const GET_PENDING_REQUESTS = gql`
	query PendingRequests {
		pendingRequests {
			id
			fromUserId
			fromUser {
				id
				username
				displayName
				avatarUrl
				university
			}
			toUserId
			toUser {
				id
				username
				displayName
				avatarUrl
				university
			}
		}
	}
`;

const DECLINE_ALL_REQUESTS = gql`
	mutation DeclineAllRequest {
		declineAllRequests
	}
`;

export function RequestsList() {
	const { show, onOpen, onClose } = useModal();

	const { data, loading } = useQuery<PendingRequestsQuery>(GET_PENDING_REQUESTS);

	const [declineAll, { loading: declineAllLoading }] = useMutation(DECLINE_ALL_REQUESTS, {
		onCompleted: () => {
			onClose();
			toast.success('Declined All Requests');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [{ query: GET_PENDING_REQUESTS }],
	});

	return loading ? (
		<div className='flex justify-center h-full pt-16'>
			<BarLoader color='silver' speedMultiplier={1.5} />
		</div>
	) : (
		<div className='pr-1 space-y-2 overflow-y-auto scrollbar-thin'>
			{data && data?.pendingRequests.length > 0 ? (
				<>
					<div className='flex justify-end px-2'>
						<span onClick={onOpen} className='cursor-pointer hover:text-red-500'>
							Decline all
						</span>
						<Modal isOpen={show} onClose={onClose}>
							<div className='text-lg font-semibold'>Decline all Requests?</div>
							<div className='mt-2 text-sm'>
								All the current pending requests will be declined and this action is
								not reversible. Click <b>Confirm</b> to decline all requests.
							</div>
							<div className='flex justify-center mt-4 space-x-4'>
								<Button variant='outlined' onClick={onClose}>
									Cancel
								</Button>
								<Button
									type='submit'
									onClick={declineAll}
									isSubmitting={declineAllLoading}
								>
									Confirm
								</Button>
							</div>
						</Modal>
					</div>
					{data?.pendingRequests.map((request) => (
						<FriendRequestCard request={request as FriendRequest} key={request.id} />
					))}
				</>
			) : (
				<div className='mt-6 text-center text-secondary'>No Pending Requests</div>
			)}
		</div>
	);
}
