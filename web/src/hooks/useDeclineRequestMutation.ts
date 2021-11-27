import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import {
	DeclineRequestMutation,
	DeclineRequestMutationVariables,
} from "src/apollo/__generated__/types";
import { GET_FRIENDS_LIST } from "src/components/friends/FriendsList";
import { GET_PENDING_REQUESTS } from "src/components/friends/RequestsList";
import { GET_USER_DATA } from "src/components/profile/ProfileDetails";

export const DECLINE_REQUEST = gql`
	mutation DeclineRequest($requestId: String!) {
		declineRequest(requestId: $requestId) {
			id
		}
	}
`;

export function useDeclineRequestMutation({ reqId, userId }: { reqId: string; userId: string }) {
	const [declineRequest, { loading }] = useMutation<
		DeclineRequestMutation,
		DeclineRequestMutationVariables
	>(DECLINE_REQUEST, {
		variables: {
			requestId: reqId,
		},
		onCompleted: () => {
			toast.success("Request Declined");
		},
		onError: (error) => {
			toast.error(error.message);
		},
		refetchQueries: [
			{ query: GET_PENDING_REQUESTS },
			{ query: GET_FRIENDS_LIST },
			{ query: GET_USER_DATA, variables: { userId } },
		],
	});

	return { declineRequest, loading };
}
