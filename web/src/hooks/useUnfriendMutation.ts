import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { UnfriendMutation, UnfriendMutationVariables } from 'src/apollo/__generated__/types';
import { GET_FRIENDS_LIST } from 'src/components/friends/FriendsList';
import { ACTIVE_MESSAGE_THREADS } from 'src/components/messages/sidebar/DirectMessages';
import { UNFRIEND_USER } from 'src/utils/requestMutations';

export function useUnfriendMutation(id: string) {
	const [unfriend] = useMutation<UnfriendMutation, UnfriendMutationVariables>(UNFRIEND_USER, {
		variables: {
			userId: id,
		},
		onCompleted: () => {
			toast.success('Unfriended Successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [{ query: GET_FRIENDS_LIST }, { query: ACTIVE_MESSAGE_THREADS }],
	});

	return unfriend;
}
