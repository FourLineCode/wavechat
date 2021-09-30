import { useMutation } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
	SendRequestMutation,
	SendRequestMutationVariables,
	UnfriendMutation,
	UnfriendMutationVariables,
	UnsendRequestMutation,
	UnsendRequestMutationVariables,
	User,
} from 'src/apollo/__generated__/types';
import { GET_FRIENDS_LIST } from 'src/components/friends/FriendsList';
import { useAuth } from 'src/store/useAuth';
import { SEND_REQUEST, UNFRIEND_USER, UNSEND_REQUEST } from 'src/utils/requestMutations';

export function useRequestButton(user: User) {
	const auth = useAuth();
	const currentUserId = auth.user?.id;
	const [sentRequestId, setSentRequestId] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [sentRequest, setSentRequest] = useState(false);
	const [alreadyFriend, setAlreadyFriend] = useState(false);

	const didSendRequest = (u: User) => {
		const length = u.pendingRequests.length;

		for (let i = 0; i < length; i++) {
			if (u.pendingRequests[i].fromUserId === currentUserId) {
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
		UnfriendMutation,
		UnfriendMutationVariables
	>(UNFRIEND_USER, {
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
		UnsendRequestMutation,
		UnsendRequestMutationVariables
	>(UNSEND_REQUEST, {
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
		SendRequestMutation,
		SendRequestMutationVariables
	>(SEND_REQUEST, {
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

	return {
		unfriend,
		unsendRequest,
		sendRequest,
		loading,
		requestButtonHandler,
		primaryButtonText,
	};
}
