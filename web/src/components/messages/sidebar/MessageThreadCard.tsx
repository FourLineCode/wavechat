import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { FaChevronRight } from 'react-icons/fa';
import { MessageThread } from 'src/apollo/__generated__/types';
import { ProfileModal } from 'src/components/profile/ProfileModal';
import { UserAvatar } from 'src/components/profile/UserAvatar';
import { ContextMenu, ContextMenuItem } from 'src/components/ui/ContextMenu';
import { useModal } from 'src/hooks/useModal';
import { useUnfriendMutation } from 'src/hooks/useUnfriendMutation';
import { useAuth } from 'src/store/useAuth';

interface Props {
	thread: MessageThread;
}

export function MessageThreadCard({ thread }: Props) {
	const router = useRouter();
	const { show, onOpen, onClose } = useModal();
	const currentUserId = useAuth().user?.id;
	const active = process.browser && window.location.pathname.endsWith(thread.id);
	const [user] = thread.participants.filter((u) => u.id !== currentUserId);
	const unfriend = useUnfriendMutation(user.id);

	return (
		<ContextMenuTrigger id={`message-thread-${user.id}`}>
			<div
				onClick={() => router.push(`/messages/thread/${thread.id}`)}
				className={clsx(
					active && 'bg-dark-700',
					'w-full p-2 space-y-2 rounded-lg cursor-pointer bg-dark-800 hover:bg-dark-700 group'
				)}
			>
				<div className='flex items-center space-x-2'>
					<UserAvatar user={user} className='flex-shrink-0 w-10 h-10 rounded-lg' />
					<div className='flex items-center w-full'>
						<div className='flex-1'>
							<div className='font-semibold cursor-pointer line-clamp-1'>
								{user.displayName}
							</div>
							<div className='text-xs text-muted'>
								{String(formatDistanceToNow(new Date(thread.updatedAt)))}
							</div>
						</div>
						<FaChevronRight
							size='16px'
							className='hidden text-secondary group-hover:block'
						/>
					</div>
				</div>
			</div>
			<ProfileModal userId={user.id} show={show} onClose={onClose} />
			<ContextMenu id={`message-thread-${user.id}`}>
				<ContextMenuItem onClick={onOpen}>View Profile</ContextMenuItem>
				<ContextMenuItem onClick={() => router.push(`/messages/thread/${thread.id}`)}>
					Message
				</ContextMenuItem>
				<ContextMenuItem onClick={unfriend}>Unfriend</ContextMenuItem>
			</ContextMenu>
		</ContextMenuTrigger>
	);
}