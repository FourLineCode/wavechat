import React from 'react';
import toast from 'react-hot-toast';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { User } from 'src/apollo/__generated__/types';
import { ProfileModal } from 'src/components/profile/ProfileModal';
import { UserAvatar } from 'src/components/profile/UserAvatar';
import { RequestButton } from 'src/components/requests/RequestButton';
import { Button } from 'src/components/ui/Button';
import { Card } from 'src/components/ui/Card';
import { useModal } from 'src/hooks/useModal';
import { useSignal } from 'src/hooks/useSignal';

interface Props {
	user: User;
}

export function DiscoveredUser({ user }: Props) {
	const { show, onOpen, onClose } = useModal();
	const [signal, sendSignal] = useSignal();

	// TODO: implement this feature after servers are done
	const inviteToServer = () => {
		toast.success('Server features coming soon');
	};

	return (
		<Card inverted className='mx-2 mb-4 space-y-2 min-w-64'>
			<div className='flex items-center space-x-2'>
				<UserAvatar
					user={user}
					onClick={onOpen}
					className='w-16 h-16 rounded-lg cursor-pointer hover:ring-2 ring-brand-500'
				/>
				<div>
					<div
						onClick={onOpen}
						className='text-lg font-semibold cursor-pointer line-clamp-1 hover:underline'
					>
						{user.displayName}
					</div>
					<div className='text-sm line-clamp-1 text-secondary'>
						{user.university ?? 'unknown'}
					</div>
				</div>
			</div>
			<RequestButton user={user} className='w-full text-sm 2xl:text-base' signal={signal} />
			<Button
				variant='outlined'
				className='w-full text-sm 2xl:text-base'
				onClick={inviteToServer}
			>
				<div className='flex items-center justify-center space-x-1'>
					<AiOutlineUsergroupAdd />
					<span className='line-clamp-1'>Invite to server</span>
				</div>
			</Button>
			<ProfileModal
				userId={user.id}
				show={show}
				onClose={onClose}
				mutationCallback={sendSignal}
			/>
		</Card>
	);
}
