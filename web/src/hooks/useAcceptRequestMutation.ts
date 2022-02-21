import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import {
    AcceptRequestMutation,
    AcceptRequestMutationVariables,
} from "src/apollo/__generated__/types";
import { GET_FRIENDS_LIST } from "src/components/friends/FriendsList";
import { GET_PENDING_REQUESTS } from "src/components/friends/RequestsList";
import { GET_USER_DATA } from "src/components/profile/ProfileDetails";

export const ACCEPT_REQUEST = gql`
    mutation AcceptRequest($requestId: String!) {
        acceptRequest(requestId: $requestId) {
            id
        }
    }
`;

export function useAcceptRequestMutation({ reqId, userId }: { reqId: string; userId: string }) {
    const [acceptRequest, { loading }] = useMutation<
        AcceptRequestMutation,
        AcceptRequestMutationVariables
    >(ACCEPT_REQUEST, {
        variables: {
            requestId: reqId,
        },
        onCompleted: () => {
            toast.success("Request Accepted");
        },
        onError: () => {
            toast.error("Failed to accept request");
        },
        refetchQueries: [
            { query: GET_PENDING_REQUESTS },
            { query: GET_FRIENDS_LIST },
            { query: GET_USER_DATA, variables: { userId } },
        ],
    });

    return { acceptRequest, loading };
}
