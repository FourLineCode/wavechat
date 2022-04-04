import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { IsFriendQuery, IsFriendQueryVariables } from "src/apollo/__generated__/types";

export const IS_FRIEND = gql`
  query IsFriend($userId: String!) {
    isFriend(userId: $userId)
  }
`;

export function useIsUserFriend(userId: string): boolean {
  const [friend, setFriend] = useState(false);

  useQuery<IsFriendQuery, IsFriendQueryVariables>(IS_FRIEND, {
    variables: { userId: userId },
    onCompleted: (data) => {
      setFriend(data.isFriend);
    },
  });

  return friend;
}
