import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import {
	CreateMessageThreadMutation,
	CreateMessageThreadMutationVariables,
} from 'src/apollo/__generated__/types';
import { ACTIVE_MESSAGE_THREADS } from 'src/components/messages/DirectMessages';

export const CREATE_MESSAGE_THREAD = gql`
	mutation CreateMessageThread($userId: String!) {
		createMessageThread(userId: $userId) {
			id
			participants {
				id
				username
				displayName
				avatarUrl
			}
		}
	}
`;

export function useMessageUserMutation() {
	const router = useRouter();

	const [getOrCreateMessageThread] = useMutation<
		CreateMessageThreadMutation,
		CreateMessageThreadMutationVariables
	>(CREATE_MESSAGE_THREAD, {
		onCompleted: (data) => {
			router.push(`/messages/thread/${data.createMessageThread.id}`);
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [{ query: ACTIVE_MESSAGE_THREADS }],
	});

	return getOrCreateMessageThread;
}
