import { gql, useMutation } from '@apollo/client';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef } from 'react';
import {
	CreateMessageThreadMutation,
	CreateMessageThreadMutationVariables,
	User,
} from 'src/apollo/__generated__/types';
import { ACTIVE_MESSAGE_THREADS } from 'src/components/messages/DirectMessages';
import { UserAvatar } from 'src/components/profile/UserAvatar';

interface Props {
	user: User;
	onClose: () => void;
	active?: boolean;
}

export const CREATE_MESSAGE_THREAD = gql`
	mutation CreateMessageThread($userId: String!) {
		createMessageThread(userId: $userId) {
			id
			participants {
				id
				username
				displayName
				avatarUrl
			}
		}
	}
`;

export function SearchUserCard({ user, onClose, active = false }: Props) {
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);

	const [getOrCreateMessageThread] = useMutation<
		CreateMessageThreadMutation,
		CreateMessageThreadMutationVariables
	>(CREATE_MESSAGE_THREAD, {
		onCompleted: (data) => {
			router.push(`/messages/thread/${data.createMessageThread.id}`);
		},
		refetchQueries: [{ query: ACTIVE_MESSAGE_THREADS }],
	});

	const getMessageThread = () => {
		getOrCreateMessageThread({ variables: { userId: user.id } });
		onClose();
	};

	const enterKeyHandler = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Enter' && active) {
				getMessageThread();
			}
		},
		[active]
	);

	useEffect(() => {
		window.addEventListener('keydown', enterKeyHandler);

		return () => {
			window.removeEventListener('keydown', enterKeyHandler);
		};
	}, [active]);

	useEffect(() => {
		if (active && ref.current) {
			ref.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});
		}
	}, [active]);

	return (
		<div
			ref={ref}
			onClick={getMessageThread}
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
