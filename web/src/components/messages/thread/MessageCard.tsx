import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { Message } from 'src/apollo/__generated__/types';
import { UserAvatar } from 'src/components/profile/UserAvatar';

interface Props {
	message: Message;
	topMessage?: boolean;
}

export function MessageCard({ message, topMessage = false }: Props) {
	return (
		<div className={clsx(topMessage && 'mt-auto', 'flex space-x-4 pr-2')}>
			<div className='flex-shrink-0 pt-1.5'>
				<UserAvatar
					user={message.author}
					className='w-10 h-10 rounded-full cursor-pointer ring-brand-500 hover:ring-1'
				/>
			</div>
			<div>
				<div className='flex items-center space-x-2'>
					<span className='text-base font-semibold cursor-pointer text-secondary line-clamp-1 hover:underline'>
						{message.author.displayName}
					</span>
					<div>
						<span className='text-xs text-muted'>
							{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
						</span>
					</div>
				</div>
				<div className='text-base break-all'>{message.body}</div>
			</div>
		</div>
	);
}
