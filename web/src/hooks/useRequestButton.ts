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
import { ACTIVE_MESSAGE_THREADS } from 'src/components/messages/sidebar/DirectMessages';
import { GET_USER_DATA } from 'src/components/profile/ProfileDetails';
import { ApiMutationCallback } from 'src/hooks/useSignal';
import { useAuth } from 'src/store/useAuth';
import { SEND_REQUEST, UNFRIEND_USER, UNSEND_REQUEST } from 'src/utils/requestMutations';

export function useRequestButton(user: User, callback?: ApiMutationCallback) {
	const auth = useAuth();
	const currentUserId = auth.user?.id;
	const [sentRequestId, setSentRequestId] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [sentRequest, setSentRequest] = useState(false);
	const [alreadyFriend, setAlreadyFriend] = useState(false);
	const [hasPendingRequest, setHasPendingRequest] = useState(false);

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

	const doesHavePendingRequest = (u: User) => {
		const length = u.sentRequests.length;

		for (let i = 0; i < length; i++) {
			if (u.sentRequests[i].toUserId === currentUserId) {
				return true;
			}
		}

		return false;
	};

	const updateButtonState = {
		setIsAlreadyFriend: () => {
			setAlreadyFriend(true);
			setSentRequest(false);
			setHasPendingRequest(false);
		},
		setAlreadySentRequest: (reqId: string) => {
			setAlreadyFriend(false);
			setHasPendingRequest(false);
			setSentRequest(true);
			setSentRequestId(reqId);
		},
		setAlreadyPendingRequest: () => {
			setAlreadyFriend(false);
			setSentRequest(false);
			setHasPendingRequest(true);
		},
		setNotFriend: () => {
			setAlreadyFriend(false);
			setSentRequest(false);
			setHasPendingRequest(false);
		},
	};

	// Sets the initial state of friendship between current user and this user
	useEffect(() => {
		setSentRequest(didSendRequest(user));
		setAlreadyFriend(isAlreadyFriend(user));
		setHasPendingRequest(doesHavePendingRequest(user));
	}, []);

	const [unfriend, { loading: unfriendLoading }] = useMutation<
		UnfriendMutation,
		UnfriendMutationVariables
	>(UNFRIEND_USER, {
		variables: { userId: user.id },
		onCompleted: () => {
			setAlreadyFriend(false);
			if (callback) callback({ message: 'unfriend' });
			toast.success('Unfriended successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [
			{ query: GET_FRIENDS_LIST },
			{ query: GET_USER_DATA, variables: { userId: user.id } },
			{ query: ACTIVE_MESSAGE_THREADS },
		],
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
			if (callback) callback({ message: 'unsend' });
			toast.success('Unsent request successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [{ query: GET_USER_DATA, variables: { userId: user.id } }],
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
			if (callback) callback({ message: 'send', reqId: data.sendRequest.id });
			toast.success('Sent request successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [{ query: GET_USER_DATA, variables: { userId: user.id } }],
	});

	const requestButtonHandler = (event: React.ChangeEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (alreadyFriend) unfriend();
		else if (hasPendingRequest) toast('Respond from friend requests tab');
		else if (sentRequest) unsendRequest();
		else return sendRequest();
	};

	const primaryButtonText = useMemo(() => {
		if (alreadyFriend) return 'Unfriend';
		else if (hasPendingRequest) return 'Respond';
		else if (sentRequest) return 'Unsend Request';
		else return 'Add Friend';
	}, [sentRequest, alreadyFriend, hasPendingRequest]);

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
		updateButtonState,
	};
}
