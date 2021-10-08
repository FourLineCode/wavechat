import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
	SearchFriendsQuery,
	SearchFriendsQueryVariables,
	User,
} from 'src/apollo/__generated__/types';
import { SearchedUserList } from 'src/components/messages/SearchedUserList';
import { useDebounceValue } from 'src/hooks/useDebounceValue';
import { useModal } from 'src/hooks/useModal';

const SEARCH_FRIENDS = gql`
	query SearchFriends($searchTerm: String!) {
		searchFriends(searchTerm: $searchTerm) {
			id
			username
			displayName
			university
			avatarUrl
		}
	}
`;

export function SearchFriendsInput() {
	const [searchTerm, setSearchTerm] = useState('');
	const { show, onOpen, onClose } = useModal(true);
	const [users, setUsers] = useState<User[]>([]);
	const debounceSearchTerm = useDebounceValue(searchTerm, 500);

	const [getSearchedFriends, { data }] = useLazyQuery<
		SearchFriendsQuery,
		SearchFriendsQueryVariables
	>(SEARCH_FRIENDS);

	useEffect(() => {
		if (!debounceSearchTerm.trim() || debounceSearchTerm.trim().length > 32) {
			setUsers([]);
			return;
		}

		getSearchedFriends({ variables: { searchTerm: debounceSearchTerm } });
	}, [debounceSearchTerm]);

	useEffect(() => {
		if (data) {
			setUsers(data.searchFriends as User[]);
		}
	}, [data]);

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
			{users.length > 0 && show && <SearchedUserList onEscape={onClose} users={users} />}
		</div>
	);
}
