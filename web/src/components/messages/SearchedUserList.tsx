import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from 'src/apollo/__generated__/types';
import { SearchUserCard } from 'src/components/messages/SearchUserCard';

interface Props {
	users: User[];
	onEscape: () => void;
}

export function SearchedUserList({ users, onEscape }: Props) {
	const [active, setActive] = useState(-1);
	const ref = useRef<HTMLDivElement>(null);

	const arrowKeyHandler = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'ArrowUp') {
				setActive((curr) => Math.max(0, curr - 1));
			} else if (e.key === 'ArrowDown') {
				setActive((curr) => Math.min(users.length - 1, curr + 1));
			} else if (e.key === 'Escape') {
				if (active >= 0) {
					setActive(-1);
				} else {
					onEscape();
				}
			}
		},
		[users, active]
	);

	useEffect(() => {
		window.addEventListener('keydown', arrowKeyHandler);

		return () => {
			window.removeEventListener('keydown', arrowKeyHandler);
		};
	}, [active]);

	useEffect(() => {
		const clickOutsideHandler = (e: MouseEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) {
				onEscape();
			}
		};

		window.addEventListener('click', clickOutsideHandler);

		return () => {
			window.removeEventListener('click', clickOutsideHandler);
		};
	}, []);

	return (
		<div
			ref={ref}
			className='absolute left-0 w-full p-2 mt-1 space-y-1 overflow-x-hidden overflow-y-auto transition-all transform border rounded-lg shadow-lg max-h-96 scrollbar-none bg-dark-900 border-dark-700 top-full'
		>
			{users.map((user, i) => (
				// TODO: change this index
				<SearchUserCard key={user.id ?? i} user={user} active={active === i} />
			))}
		</div>
	);
}
