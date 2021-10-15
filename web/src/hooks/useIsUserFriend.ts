import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IsFriendQuery, IsFriendQueryVariables } from 'src/apollo/__generated__/types';

export const IS_FRIEND = gql`
	query IsFriend($userId: String!) {
		isFriend(userId: $userId)
	}
`;

export function useIsUserFriend(userId: string): boolean {
	const [friend, setFriend] = useState(false);

	const { data } = useQuery<IsFriendQuery, IsFriendQueryVariables>(IS_FRIEND, {
		variables: { userId: userId },
	});

	useEffect(() => {
		if (data) {
			setFriend(data.isFriend);
		}
	}, [data]);

	return friend;
}
