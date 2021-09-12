import gql from '.pnpm/graphql-tag@2.12.5_graphql@15.5.3/node_modules/graphql-tag';
import { useMutation } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaUserPlus } from 'react-icons/fa';
import {
	DiscoverSendRequestMutation,
	DiscoverSendRequestMutationVariables,
	DiscoverUnfriendMutation,
	DiscoverUnfriendMutationVariables,
	DiscoverUnsendRequestMutation,
	DiscoverUnsendRequestMutationVariables,
	User,
} from 'src/apollo/__generated__/types';
import { GET_DISCOVER_USERS } from 'src/components/discover/DiscoverUsersPage';
import { Button } from 'src/components/ui/Button';
import { Card } from 'src/components/ui/Card';
import { useAvatarUrl } from 'src/hooks/useAvatarUrl';
import { useAuth } from 'src/store/useAuth';

interface Props {
	user: User;
	searchTerm: string;
}

const SEND_REQUEST = gql`
	mutation DiscoverSendRequest($userId: String!) {
		sendRequest(userId: $userId) {
			id
		}
	}
`;

const UNFRIEND_USER = gql`
	mutation DiscoverUnfriend($userId: String!) {
		unfriend(userId: $userId) {
			id
		}
	}
`;

const UNSEND_REQUEST = gql`
	mutation DiscoverUnsendRequest($requestId: String!) {
		unsendRequest(requestId: $requestId)
	}
`;

export function DiscoveredUser({ user, searchTerm }: Props) {
	const auth = useAuth();
	const currentUserId = auth.user?.id;
	const avatarUrl = useAvatarUrl(user);
	const [sentRequestId, setSentRequestId] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const sentRequest = useMemo(() => {
		const length = user.pendingRequests.length;

		for (let i = 0; i < length; i++) {
			if (user.pendingRequests[i].fromUserId === currentUserId) {
				setSentRequestId(user.pendingRequests[i].id);
				return true;
			}
		}

		return false;
	}, [user, currentUserId]);

	const alreadyFriend = useMemo(() => {
		const length = user.friends.length;

		for (let i = 0; i < length; i++) {
			if (
				user.friends[i].firstUserId === currentUserId ||
				user.friends[i].secondUserId === currentUserId
			) {
				return true;
			}
		}

		return false;
	}, [user, currentUserId]);

	const primaryButtonText = useMemo(() => {
		if (alreadyFriend) return 'Unfriend';
		else if (sentRequest) return 'Unsend Request';
		else return 'Add Friend';
	}, [sentRequest, alreadyFriend]);

	const [unfriend, { loading: unfriendLoading }] = useMutation<
		DiscoverUnfriendMutation,
		DiscoverUnfriendMutationVariables
	>(UNFRIEND_USER, {
		variables: { userId: user.id },
		refetchQueries: [{ query: GET_DISCOVER_USERS, variables: { query: searchTerm } }],
		onCompleted: () => {
			toast.success('Unfriended successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const [unsendRequest, { loading: unsendLoading }] = useMutation<
		DiscoverUnsendRequestMutation,
		DiscoverUnsendRequestMutationVariables
	>(UNSEND_REQUEST, {
		variables: {
			requestId: sentRequestId,
		},
		refetchQueries: [{ query: GET_DISCOVER_USERS, variables: { query: searchTerm } }],
		onCompleted: () => {
			toast.success('Unsent request successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const [sendRequest, { loading: sendLoading }] = useMutation<
		DiscoverSendRequestMutation,
		DiscoverSendRequestMutationVariables
	>(SEND_REQUEST, {
		variables: {
			userId: user.id,
		},
		refetchQueries: [{ query: GET_DISCOVER_USERS, variables: { query: searchTerm } }],
		onCompleted: () => {
			toast.success('Sent request successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	useEffect(() => {
		const isLoading = sendLoading || unsendLoading || unfriendLoading;

		if (isLoading) {
			setLoading(true);
			return;
		}

		// Delay the loding to prevent spam clicking button
		const loadingTimeout = setTimeout(() => {
			setLoading(false);
		}, 500);

		return () => {
			clearTimeout(loadingTimeout);
		};
	}, [sendLoading, unsendLoading, unfriendLoading]);

	const requestButtonHandler = (event: React.ChangeEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (alreadyFriend) unfriend();
		else if (sentRequest) unsendRequest();
		else return sendRequest();
	};

	// TODO: implement this feature after servers are done
	const inviteToServer = () => {
		toast.success('Server features coming soon');
	};

	return (
		<Card inverted className='mx-2 mb-4 space-y-2 min-w-64'>
			<div className='flex items-center space-x-2'>
				<img
					src={avatarUrl}
					alt='user-avatar'
					className='w-16 h-16 rounded-lg cursor-pointer hover:ring-2 ring-brand-500'
				/>
				<div>
					<div className='text-lg font-semibold cursor-pointer line-clamp-1 hover:underline'>
						{user.displayName}
					</div>
					<div className='text-sm line-clamp-1 text-secondary'>
						{user.university ?? 'unknown'}
					</div>
				</div>
			</div>
			<Button
				type='submit'
				className='w-full text-sm 2xl:text-base'
				onClick={requestButtonHandler}
				isSubmitting={loading}
			>
				<div className='flex items-center justify-center space-x-1'>
					<FaUserPlus />
					<span className='line-clamp-1'>{primaryButtonText}</span>
				</div>
			</Button>
			<Button
				variant='outlined'
				className='w-full text-sm 2xl:text-base'
				onClick={inviteToServer}
			>
				<div className='flex items-center justify-center space-x-1'>
					<AiOutlineUsergroupAdd />
					<span className='line-clamp-1'>Invite to server</span>
				</div>
			</Button>
		</Card>
	);
}
