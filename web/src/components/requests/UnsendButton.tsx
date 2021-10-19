import { gql, useMutation } from '@apollo/client';
import React from 'react';
import toast from 'react-hot-toast';
import { IoArrowUndo } from 'react-icons/io5';
import {
	UnsendRequestMutation,
	UnsendRequestMutationVariables,
} from 'src/apollo/__generated__/types';
import { GET_USER_DATA } from 'src/components/profile/ProfileDetails';
import { RequestButtonProps, RequestButtonState } from 'src/components/requests/RequestButton';
import { Button } from 'src/components/ui/Button';

export const UNSEND_REQUEST = gql`
	mutation UnsendRequest($requestId: String!) {
		unsendRequest(requestId: $requestId)
	}
`;

export function UnsendButton({ user, className, setState, reqId, setReqId }: RequestButtonProps) {
	const [unsendRequest, { loading }] = useMutation<
		UnsendRequestMutation,
		UnsendRequestMutationVariables
	>(UNSEND_REQUEST, {
		variables: { requestId: reqId },
		onCompleted: () => {
			setState(RequestButtonState.NotFriend);
			setReqId(null);
			toast.success('Unsent request successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [{ query: GET_USER_DATA, variables: { userId: user.id } }],
	});

	return (
		<Button type='submit' className={className} onClick={unsendRequest} isSubmitting={loading}>
			<div className='flex items-center justify-center space-x-1'>
				<IoArrowUndo />
				<span className='line-clamp-1'>Unsend Request</span>
			</div>
		</Button>
	);
}
