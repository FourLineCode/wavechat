import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { User } from 'src/apollo/__generated__/types';
import { UserAvatar } from 'src/components/profile/UserAvatar';

interface Props {
	user: User;
	onClose: () => void;
	active?: boolean;
}

export function SearchUserCard({ user, onClose, active = true }: Props) {
	const clickHandler = () => {
		console.log('clicked user');
		onClose();
	};

	const enterKeyHandler = useRef((e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			clickHandler();
		}
	});

	useEffect(() => {
		window.addEventListener('keydown', enterKeyHandler.current);

		return () => {
			window.removeEventListener('keydown', enterKeyHandler.current);
		};
	}, []);

	return (
		<div
			onClick={clickHandler}
			className={clsx(
				active && '!bg-dark-800',
				'flex items-center p-1 space-x-2 rounded-lg cursor-pointer bg-dark-900 hover:bg-dark-800'
			)}
		>
			<UserAvatar user={user} className='flex-shrink-0 w-10 h-10 rounded-lg' />
			<div className='w-full'>
				<div className='font-semibold cursor-pointer line-clamp-1 group-hover:underline'>
					{user.displayName}
				</div>
				<div className='text-xs line-clamp-1 text-secondary'>
					{user.university ?? 'unknown'}
				</div>
			</div>
		</div>
	);
}
