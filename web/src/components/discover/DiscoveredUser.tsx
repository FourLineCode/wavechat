import { gql, useMutation } from '@apollo/client';
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
import { GET_FRIENDS_LIST } from 'src/components/friends/FriendsList';
import { Button } from 'src/components/ui/Button';
import { Card } from 'src/components/ui/Card';
import { useAvatarUrl } from 'src/hooks/useAvatarUrl';
import { useAuth } from 'src/store/useAuth';

interface Props {
	user: User;
}

const DISCOVER_SEND_REQUEST = gql`
	mutation DiscoverSendRequest($userId: String!) {
		sendRequest(userId: $userId) {
			id
		}
	}
`;

const DISCOVER_UNFRIEND_USER = gql`
	mutation DiscoverUnfriend($userId: String!) {
		unfriend(userId: $userId) {
			id
		}
	}
`;

const DISCOVER_UNSEND_REQUEST = gql`
	mutation DiscoverUnsendRequest($requestId: String!) {
		unsendRequest(requestId: $requestId)
	}
`;

export function DiscoveredUser({ user }: Props) {
	const auth = useAuth();
	const currentUserId = auth.user?.id;
	const avatarUrl = useAvatarUrl(user);
	const [sentRequestId, setSentRequestId] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [sentRequest, setSentRequest] = useState(false);
	const [alreadyFriend, setAlreadyFriend] = useState(false);

	const didSendRequest = (u: User) => {
		const length = u.pendingRequests.length;
		console.log('length');

		for (let i = 0; i < length; i++) {
			console.log('it');
			if (u.pendingRequests[i].fromUserId === currentUserId) {
				console.log('found');
				setSentRequestId(u.pendingRequests[i].id);
				return true;
			}
		}

		return false;
	};

	const isAlreadyFriend = (u: User) => {
		const length = u.friends.length;

		for (let i = 0; i < length; i++) {
			if (
				u.friends[i].firstUserId === currentUserId ||
				u.friends[i].secondUserId === currentUserId
			) {
				return true;
			}
		}

		return false;
	};

	// Sets the initial state of friendship between current user and this user
	useEffect(() => {
		setSentRequest(didSendRequest(user));
		setAlreadyFriend(isAlreadyFriend(user));
	}, []);

	const [unfriend, { loading: unfriendLoading }] = useMutation<
		DiscoverUnfriendMutation,
		DiscoverUnfriendMutationVariables
	>(DISCOVER_UNFRIEND_USER, {
		variables: { userId: user.id },
		onCompleted: () => {
			setAlreadyFriend(false);
			toast.success('Unfriended successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [{ query: GET_FRIENDS_LIST }],
	});

	const [unsendRequest, { loading: unsendLoading }] = useMutation<
		DiscoverUnsendRequestMutation,
		DiscoverUnsendRequestMutationVariables
	>(DISCOVER_UNSEND_REQUEST, {
		variables: {
			requestId: sentRequestId,
		},
		onCompleted: () => {
			setSentRequest(false);
			toast.success('Unsent request successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const [sendRequest, { loading: sendLoading }] = useMutation<
		DiscoverSendRequestMutation,
		DiscoverSendRequestMutationVariables
	>(DISCOVER_SEND_REQUEST, {
		variables: {
			userId: user.id,
		},
		onCompleted: (data) => {
			setSentRequest(true);
			setSentRequestId(data.sendRequest.id);
			toast.success('Sent request successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const requestButtonHandler = (event: React.ChangeEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (alreadyFriend) unfriend();
		else if (sentRequest) unsendRequest();
		else return sendRequest();
	};

	const primaryButtonText = useMemo(() => {
		if (alreadyFriend) return 'Unfriend';
		else if (sentRequest) return 'Unsend Request';
		else return 'Add Friend';
	}, [sentRequest, alreadyFriend]);

	useEffect(() => {
		const isLoading = sendLoading || unsendLoading || unfriendLoading;

		if (isLoading) {
			setLoading(true);
			return;
		}

		setLoading(false);
	}, [sendLoading, unsendLoading, unfriendLoading]);

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
