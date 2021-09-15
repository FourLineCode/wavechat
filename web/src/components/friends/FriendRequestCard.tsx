import React from 'react';
import toast from 'react-hot-toast';
import { FriendRequest } from 'src/apollo/__generated__/types';
import { Button } from 'src/components/ui/Button';
import { Card } from 'src/components/ui/Card';
import { useAvatarUrl } from 'src/hooks/useAvatarUrl';

interface Props {
	request: FriendRequest;
}

export function FriendRequestCard({ request }: Props) {
	const avatarUrl = useAvatarUrl(request.fromUser);

	return (
		<Card className='w-full !p-2 space-y-2'>
			<div className='flex items-center space-x-2'>
				<img
					src={avatarUrl}
					alt='user-avatar'
					className='w-10 h-10 rounded-lg cursor-pointer hover:ring-2 ring-brand-500'
				/>
				<div>
					<div className='font-semibold cursor-pointer line-clamp-1 hover:underline'>
						{request.fromUser.displayName}
					</div>
					<div className='text-xs line-clamp-1 text-secondary'>
						{request.fromUser.university ?? 'unknown'}
					</div>
				</div>
			</div>
			<div className='flex space-x-2'>
				<Button
					type='submit'
					onClick={() => toast.success('accepted')}
					className='w-full text-sm 2xl:text-base'
					isSubmitting={false}
				>
					<span className='line-clamp-1'>Accept</span>
				</Button>
				<Button
					onClick={() => toast.error('declined')}
					variant='outlined'
					className='w-full text-sm 2xl:text-base'
				>
					<span className='line-clamp-1'>Decline</span>
				</Button>
			</div>
		</Card>
	);
}
