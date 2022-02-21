import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { UnfriendMutation, UnfriendMutationVariables } from "src/apollo/__generated__/types";
import { GET_FRIENDS_LIST } from "src/components/friends/FriendsList";
import { ACTIVE_MESSAGE_THREADS } from "src/components/messages/sidebar/DirectMessages";

export const UNFRIEND_USER = gql`
    mutation Unfriend($userId: String!) {
        unfriend(userId: $userId) {
            id
        }
    }
`;

export function useUnfriendMutation(userId: string) {
    const [unfriend] = useMutation<UnfriendMutation, UnfriendMutationVariables>(UNFRIEND_USER, {
        variables: {
            userId: userId,
        },
        onCompleted: () => {
            toast.success("Unfriended Successfully");
        },
        onError: () => {
            toast.error("Failed to unfriend user");
        },
        refetchQueries: [{ query: GET_FRIENDS_LIST }, { query: ACTIVE_MESSAGE_THREADS }],
    });

    return unfriend;
}
