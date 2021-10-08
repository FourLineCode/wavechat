import React, { useEffect, useState } from 'react';
import { User } from 'src/apollo/__generated__/types';
import { SearchedUserList } from 'src/components/messages/SearchedUserList';
import { useDebounceValue } from 'src/hooks/useDebounceValue';
import { useModal } from 'src/hooks/useModal';

export function SearchFriends() {
	const [searchTerm, setSearchTerm] = useState('');
	const { show, onOpen, onClose } = useModal(true);
	const debounceSearchTerm = useDebounceValue(searchTerm, 500);

	useEffect(() => {
		// TODO: fetch data
	}, [debounceSearchTerm]);

	return (
		<div className='relative w-full'>
			<input
				type='text'
				placeholder='Search a friend'
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					onOpen();
				}}
				onKeyDown={(e) => ['ArrowUp', 'ArrowDown'].includes(e.key) && e.preventDefault()}
				className='w-full p-2 text-sm transition rounded-lg placeholder-dark-500 text-primary bg-dark-700 focus:bg-dark-600 focus:ring-2 ring-brand-500 focus:outline-none'
			/>
			{debounceSearchTerm && show && (
				<SearchedUserList
					onEscape={onClose}
					users={
						Array.from({ length: debounceSearchTerm.length / 4 }).fill({
							displayName: debounceSearchTerm,
							university: 'East West University',
							avatarUrl: 'http://github.com/fourlinecode.png',
						} as User) as User[]
					}
				/>
			)}
		</div>
	);
}
