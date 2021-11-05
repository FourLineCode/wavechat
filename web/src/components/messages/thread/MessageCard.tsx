import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { MessageGroup } from 'src/components/messages/thread/MessageThreadPage';
import { ProfileModal } from 'src/components/profile/ProfileModal';
import { UserAvatar } from 'src/components/profile/UserAvatar';
import { useModal } from 'src/hooks/useModal';

interface Props {
	messageGroup: MessageGroup;
	topMessage?: boolean;
}

export function MessageCard({ messageGroup, topMessage = false }: Props) {
	const messageAuthorModal = useModal();

	return (
		<div
			className={clsx(
				topMessage && 'mt-auto',
				'flex hover:bg-dark-800 hover:bg-opacity-50 cursor-default py-1 pl-4 space-x-4 pr-4'
			)}
		>
			<div className='flex-shrink-0 pt-1.5'>
				<UserAvatar
					user={messageGroup.author}
					onClick={messageAuthorModal.onOpen}
					className='w-10 h-10 rounded-full cursor-pointer ring-brand-500 hover:ring-1'
				/>
			</div>
			<div>
				<div className='flex items-center space-x-2'>
					<span
						onClick={messageAuthorModal.onOpen}
						className='text-base font-semibold cursor-pointer text-secondary line-clamp-1 hover:underline'
					>
						{messageGroup.author.displayName}
					</span>
					<div>
						<span className='text-xs text-muted'>
							{formatDistanceToNow(new Date(messageGroup.createdAt), {
								addSuffix: true,
							})}
						</span>
					</div>
				</div>
				<div className='space-y-1.5'>
					{messageGroup.messages.map((message) => (
						<div className='text-base break-all font-roboto'>{message.body}</div>
					))}
				</div>
			</div>
			<ProfileModal userId={messageGroup.authorId} {...messageAuthorModal} />
		</div>
	);
}
