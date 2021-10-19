import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { FaUserMinus } from 'react-icons/fa';
import { UnfriendMutation, UnfriendMutationVariables } from 'src/apollo/__generated__/types';
import { GET_FRIENDS_LIST } from 'src/components/friends/FriendsList';
import { ACTIVE_MESSAGE_THREADS } from 'src/components/messages/sidebar/DirectMessages';
import { GET_USER_DATA } from 'src/components/profile/ProfileDetails';
import { RequestButtonProps, RequestButtonState } from 'src/components/requests/RequestButton';
import { Button } from 'src/components/ui/Button';
import { UNFRIEND_USER } from 'src/hooks/useUnfriendMutation';

export function UnfriendButton({ user, className, setState }: RequestButtonProps) {
	const [unfriend, { loading }] = useMutation<UnfriendMutation, UnfriendMutationVariables>(
		UNFRIEND_USER,
		{
			variables: { userId: user.id },
			onCompleted: () => {
				setState(RequestButtonState.NotFriend);
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
		}
	);

	return (
		<Button type='submit' className={className} onClick={unfriend} isSubmitting={loading}>
			<div className='flex items-center justify-center space-x-1'>
				<FaUserMinus />
				<span className='line-clamp-1'>Unfriend</span>
			</div>
		</Button>
	);
}
