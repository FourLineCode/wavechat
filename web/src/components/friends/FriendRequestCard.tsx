import { gql, useMutation } from '@apollo/client';
import React from 'react';
import toast from 'react-hot-toast';
import {
	AcceptRequestMutation,
	AcceptRequestMutationVariables,
	DeclineRequestMutation,
	DeclineRequestMutationVariables,
	FriendRequest,
} from 'src/apollo/__generated__/types';
import { GET_FRIENDS_LIST } from 'src/components/friends/FriendsList';
import { GET_PENDING_REQUESTS } from 'src/components/friends/RequestsList';
import { GET_USER_DATA } from 'src/components/profile/ProfileDetails';
import { ProfileModal } from 'src/components/profile/ProfileModal';
import { UserAvatar } from 'src/components/profile/UserAvatar';
import { Button } from 'src/components/ui/Button';
import { Card } from 'src/components/ui/Card';
import { useModal } from 'src/hooks/useModal';

interface Props {
	request: FriendRequest;
}

const ACCEPT_REQUEST = gql`
	mutation AcceptRequest($requestId: String!) {
		acceptRequest(requestId: $requestId) {
			id
		}
	}
`;

const DECLINE_REQUEST = gql`
	mutation DeclineRequest($requestId: String!) {
		declineRequest(requestId: $requestId) {
			id
		}
	}
`;

export function FriendRequestCard({ request }: Props) {
	const friendRequestProfile = useModal();

	const [acceptRequest, { loading: acceptRequestLoading }] = useMutation<
		AcceptRequestMutation,
		AcceptRequestMutationVariables
	>(ACCEPT_REQUEST, {
		variables: {
			requestId: request.id,
		},
		onCompleted: () => {
			toast.success('Request Accepted');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [
			{ query: GET_PENDING_REQUESTS },
			{ query: GET_FRIENDS_LIST },
			{ query: GET_USER_DATA, variables: { userId: request.fromUserId } },
		],
	});

	const [declineRequest, { loading: declineRequestLoading }] = useMutation<
		DeclineRequestMutation,
		DeclineRequestMutationVariables
	>(DECLINE_REQUEST, {
		variables: {
			requestId: request.id,
		},
		onCompleted: () => {
			toast.success('Request Declined');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [
			{ query: GET_PENDING_REQUESTS },
			{ query: GET_FRIENDS_LIST },
			{ query: GET_USER_DATA, variables: { userId: request.fromUserId } },
		],
	});

	return (
		<Card className='w-full !p-2 space-y-2'>
			<div className='flex items-center space-x-2'>
				<UserAvatar
					user={request.fromUser}
					onClick={friendRequestProfile.onOpen}
					className='w-10 h-10 rounded-lg cursor-pointer hover:ring-2 ring-brand-500'
				/>
				<div>
					<div
						onClick={friendRequestProfile.onOpen}
						className='font-semibold cursor-pointer line-clamp-1 hover:underline'
					>
						{request.fromUser.displayName}
					</div>
					<div className='text-xs line-clamp-1 text-secondary'>
						{request.fromUser.university ?? 'unknown'}
					</div>
				</div>
			</div>
			<div className='flex space-x-2'>
				<Button
					type='submit'
					isSubmitting={acceptRequestLoading}
					onClick={acceptRequest}
					className='w-full text-sm 2xl:text-base'
				>
					<span className='line-clamp-1'>Accept</span>
				</Button>
				<Button
					type='submit'
					variant='outlined'
					isSubmitting={declineRequestLoading}
					onClick={declineRequest}
					className='w-full text-sm 2xl:text-base'
				>
					<span className='line-clamp-1'>Decline</span>
				</Button>
			</div>
			<ProfileModal userId={request.fromUserId} {...friendRequestProfile} />
		</Card>
	);
}
