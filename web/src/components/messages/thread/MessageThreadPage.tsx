import { useRouter } from 'next/router';
import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { MessageThread } from 'src/apollo/__generated__/types';
import { ProfileModal } from 'src/components/profile/ProfileModal';
import { UserAvatar } from 'src/components/profile/UserAvatar';
import {
	DropdownMenu,
	DropdownMenuButton,
	DropdownMenuItem,
	DropdownMenuItems,
} from 'src/components/ui/Menu';
import { useModal } from 'src/hooks/useModal';
import { useUnfriendMutation } from 'src/hooks/useUnfriendMutation';
import { useAuth } from 'src/store/useAuth';

interface Props {
	thread: MessageThread;
}

export function MessageThreadPage({ thread }: Props) {
	const router = useRouter();
	const profileModal = useModal();
	const currentUserId = useAuth().user?.id;
	const [user] = thread.participants.filter((u) => u.id !== currentUserId);
	const unfriend = useUnfriendMutation(user.id);

	return (
		<div className='flex flex-col w-full h-full'>
			<div className='flex items-center justify-between w-full h-12 px-6 py-1 bg-opacity-50 bg-dark-800'>
				<div className='flex items-center space-x-2'>
					<UserAvatar user={user} className='w-8 h-8 rounded-md ring ring-dark-700' />
					<span className='text-lg font-semibold'>{user.displayName}</span>
				</div>
				<div>
					<DropdownMenu>
						<DropdownMenuButton className='p-1.5 rounded-full cursor-pointer hover:bg-dark-700 group'>
							<HiDotsVertical
								size='20px'
								className='p-0.5 text-black rounded-full bg-dark-600 group-hover:bg-dark-500'
							/>
						</DropdownMenuButton>
						<DropdownMenuItems>
							<DropdownMenuItem onClick={profileModal.onOpen}>
								<span>View Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									unfriend();
									router.push('/messages');
								}}
							>
								Unfriend
							</DropdownMenuItem>
						</DropdownMenuItems>
						<ProfileModal userId={user.id} {...profileModal} />
					</DropdownMenu>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center flex-1 w-full'>
				<div className='text-xl font-bold text-primary'>Thread - {thread.id}</div>
				<div>Participants:</div>
				<div>{thread.participants[0].displayName}</div>
				<div>{thread.participants[1].displayName}</div>
			</div>
		</div>
	);
}
