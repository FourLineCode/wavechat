import { gql, useMutation } from "@apollo/client";
import { UserPlus } from "phosphor-react";
import toast from "react-hot-toast";
import { SendRequestMutation, SendRequestMutationVariables } from "src/apollo/__generated__/types";
import { GET_USER_DATA } from "src/components/profile/ProfileDetails";
import { RequestButtonProps, RequestButtonState } from "src/components/requests/RequestButton";
import { Button } from "src/components/ui/Button";

export const SEND_REQUEST = gql`
  mutation SendRequest($userId: String!) {
    sendRequest(userId: $userId) {
      id
    }
  }
`;

export function AddButton({ user, className, setState, setReqId }: RequestButtonProps) {
  const [sendRequest, { loading }] = useMutation<SendRequestMutation, SendRequestMutationVariables>(
    SEND_REQUEST,
    {
      variables: { userId: user.id },
      onCompleted: (data) => {
        setState(RequestButtonState.SentRequest);
        setReqId(data.sendRequest.id);
        toast.success("Sent request successfully");
      },
      onError: () => {
        toast.error("Failed to send request");
      },
      refetchQueries: [{ query: GET_USER_DATA, variables: { userId: user.id } }],
    }
  );

  return (
    <Button type="submit" className={className} onClick={sendRequest} isSubmitting={loading}>
      <div className="flex items-center justify-center space-x-1">
        <UserPlus weight="fill" size={24} />
        <span className="line-clamp-1">Add Friend</span>
      </div>
    </Button>
  );
}
