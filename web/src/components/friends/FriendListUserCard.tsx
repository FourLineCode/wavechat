import { useMutation } from '@apollo/client';
import React from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import toast from 'react-hot-toast';
import {
	Friendship,
	UnfriendMutation,
	UnfriendMutationVariables,
} from 'src/apollo/__generated__/types';
import { GET_FRIENDS_LIST } from 'src/components/friends/FriendsList';
import { ProfileModal } from 'src/components/profile/ProfileModal';
import { UserAvatar } from 'src/components/profile/UserAvatar';
import { Card } from 'src/components/ui/Card';
import { useModal } from 'src/hooks/useModal';
import { useAuth } from 'src/store/useAuth';
import { UNFRIEND_USER } from 'src/utils/requestMutations';

interface Props {
	friendship: Friendship;
}

export function FriendListUserCard({ friendship }: Props) {
	const id = useAuth().user?.id;
	const friend = friendship.firstUserId === id ? friendship.secondUser : friendship.firstUser;
	const { show, onOpen, onClose } = useModal();

	const [unfriend] = useMutation<UnfriendMutation, UnfriendMutationVariables>(UNFRIEND_USER, {
		variables: {
			userId: friend.id,
		},
		onCompleted: () => {
			toast.success('Unfriended Successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [{ query: GET_FRIENDS_LIST }],
	});

	return (
		<ContextMenuTrigger id={`friend-list-card-${friend.id}`}>
			<Card
				onClick={onOpen}
				className='w-full !p-3 hover:bg-opacity-75 group cursor-pointer space-y-2'
			>
				<div className='flex items-center space-x-2'>
					<UserAvatar
						user={friend}
						className='flex-shrink-0 w-10 h-10 rounded-lg cursor-pointer hover:ring-2 ring-brand-500'
					/>
					<div className='w-full'>
						<div className='font-semibold cursor-pointer line-clamp-1 group-hover:underline'>
							{friend.displayName}
						</div>
						<div className='text-xs line-clamp-1 text-secondary'>
							{friend.university ?? 'unknown'}
						</div>
					</div>
				</div>
				<ProfileModal userId={friend.id} show={show} onClose={onClose} />
			</Card>
			<ContextMenu
				className='p-2 rounded-md bg-dark-900'
				id={`friend-list-card-${friend.id}`}
			>
				<MenuItem
					onClick={() => toast.success(`profile modal ${friend.displayName}`)}
					className='px-4 py-2 font-semibold text-center rounded-sm cursor-pointer hover:bg-brand-500'
				>
					View Profile
				</MenuItem>
				<MenuItem
					onClick={unfriend}
					className='px-4 py-2 font-semibold text-center rounded-sm cursor-pointer hover:bg-brand-500'
				>
					Unfriend
				</MenuItem>
			</ContextMenu>
		</ContextMenuTrigger>
	);
}
