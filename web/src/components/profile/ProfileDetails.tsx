import { gql, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import React from 'react';
import { HashLoader } from 'react-spinners';
import { GetUserDataQuery, GetUserDataQueryVariables, User } from 'src/apollo/__generated__/types';
import { RequestButton } from 'src/components/requests/RequestButton';
import { Modal } from 'src/components/ui/Modal';
import { useAuth } from 'src/store/useAuth';

interface Props {
	userId: string;
	show: boolean;
	onClose: () => void;
}

export const GET_USER_DATA = gql`
	query GetUserData($userId: String!) {
		user(userId: $userId) {
			id
			email
			username
			displayName
			avatarUrl
			role
			createdAt
			updatedAt
			university
			department
			semester
			pendingRequests {
				id
				fromUserId
			}
			friends {
				firstUserId
				secondUserId
			}
		}
	}
`;

export function ProfileDetails({ userId, show, onClose }: Props) {
	const currUserId = useAuth().user?.id;

	const { data, loading } = useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GET_USER_DATA, {
		variables: {
			userId: userId,
		},
	});

	return (
		<Modal large isOpen={show} onClose={onClose}>
			{data && !loading ? (
				<div className='flex items-center justify-between'>
					<div className='flex items-center flex-1 space-x-2'>
						<img
							src={data.user.avatarUrl ?? ''}
							alt='avatar'
							className='w-16 h-16 rounded-full'
						/>
						<div>
							<div className='text-lg font-semibold line-clamp-1'>
								{data.user.displayName}
							</div>
							<div className='text-sm text-muted line-clamp-1'>
								{'Joined: ' + format(new Date(data.user.createdAt), 'dd MMM, yyyy')}
							</div>
						</div>
					</div>
					{data.user.id !== currUserId && <RequestButton user={data.user as User} />}
				</div>
			) : (
				<div className='flex items-center justify-center w-full h-32'>
					<HashLoader color='silver' size='24px' />
				</div>
			)}
		</Modal>
	);
}
