import { gql, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import ordinal from 'ordinal';
import React from 'react';
import toast from 'react-hot-toast';
import { FaBuilding, FaGraduationCap, FaUniversity } from 'react-icons/fa';
import { RiFileUserFill } from 'react-icons/ri';
import { HashLoader } from 'react-spinners';
import { GetUserDataQuery, GetUserDataQueryVariables, User } from 'src/apollo/__generated__/types';
import { UserAvatar } from 'src/components/profile/UserAvatar';
import { RequestButton } from 'src/components/requests/RequestButton';
import { ApiMutationCallback } from 'src/hooks/useSignal';
import { useAuth } from 'src/store/useAuth';

interface Props {
	userId: string;
	mutationCallback?: ApiMutationCallback;
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
			bio
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

export function ProfileDetails({ userId, mutationCallback }: Props) {
	const currUserId = useAuth().user?.id;

	const { data, loading } = useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GET_USER_DATA, {
		variables: {
			userId: userId,
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return data && !loading ? (
		<>
			<div className='flex items-center justify-between'>
				<div className='flex items-center flex-1 space-x-2'>
					<UserAvatar user={data.user as User} />
					<div>
						<div className='text-lg font-semibold line-clamp-1'>
							{data.user.displayName}
						</div>
						<div className='text-sm text-muted line-clamp-1'>
							{'Joined: ' + format(new Date(data.user.createdAt), 'dd MMM, yyyy')}
						</div>
					</div>
				</div>
				{data.user.id !== currUserId && (
					<RequestButton user={data.user as User} mutationCallback={mutationCallback} />
				)}
			</div>
			<div className='px-4 mt-4 space-y-2'>
				{data.user.bio && (
					<div className='flex space-x-2'>
						<div>
							<RiFileUserFill className='w-5 h-5 mt-1 text-muted' />
						</div>
						<div className='text-base'>{data.user.bio}</div>
					</div>
				)}
				{data.user.university && (
					<div className='flex space-x-2'>
						<div>
							<FaUniversity className='w-5 h-5 mt-1 text-muted' />
						</div>
						<div className='text-base'>{data.user.university}</div>
					</div>
				)}
				{data.user.department && (
					<div className='flex space-x-2'>
						<div>
							<FaBuilding className='w-5 h-5 mt-1 text-muted' />
						</div>
						<div className='text-base'>{data.user.department}</div>
					</div>
				)}
				{data.user.semester && (
					<div className='flex space-x-2'>
						<div>
							<FaGraduationCap className='w-5 h-5 mt-1 text-muted' />
						</div>
						<div className='text-base'>
							{ordinal(data.user.semester as number) + ' semester'}
						</div>
					</div>
				)}
			</div>
		</>
	) : (
		<div className='flex items-center justify-center w-full h-32'>
			<HashLoader color='silver' size='24px' />
		</div>
	);
}
