import { useMutation } from "@apollo/client";
import { CircleWavyQuestion } from "phosphor-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  DeleteInviteByIdMutation,
  DeleteInviteByIdMutationVariables,
  InviteUserToServerByIdMutation,
  InviteUserToServerByIdMutationVariables,
  Server,
  User,
} from "src/apollo/__generated__/types";
import {
  DELETE_INVITE_BY_ID,
  INVITE_USER_TO_SERVER_BY_ID,
} from "src/components/server/InviteFriendToServerCard";
import { Button } from "src/components/ui/Button";

interface Props {
  user: User;
  server: Server;
}

export function InviteToServerCard({ user, server }: Props) {
  const [invited, setInvited] = useState(false);

  const [inviteUser, { loading: sendLoading }] = useMutation<
    InviteUserToServerByIdMutation,
    InviteUserToServerByIdMutationVariables
  >(INVITE_USER_TO_SERVER_BY_ID, {
    variables: {
      userId: user.id,
      serverId: server.id,
    },
    onError: () => {
      toast.error("Failed to send invite\nUser already invited or server is closed", {
        style: {
          textAlign: "center",
        },
      });
    },
    onCompleted: () => {
      setInvited(true);
      toast.success("Successfully sent invite");
    },
  });

  const [unsendInvite, { loading: unsendLoading }] = useMutation<
    DeleteInviteByIdMutation,
    DeleteInviteByIdMutationVariables
  >(DELETE_INVITE_BY_ID, {
    variables: {
      userId: user.id,
      serverId: server.id,
    },
    onError: () => {
      toast.error("Failed to unsend invite");
    },
    onCompleted: () => {
      setInvited(false);
      toast.success("Successfully unsent invite");
    },
  });

  return (
    <div className="flex justify-between w-full py-2 pr-2 rounded-lg">
      <div className="flex items-center space-x-2">
        {server.iconUrl ? (
          <img
            src={server.iconUrl}
            alt="server-icon"
            className="flex-shrink-0 object-cover w-10 h-10 rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-dark-800">
            <CircleWavyQuestion size={28} weight="bold" className="text-secondary" />
          </div>
        )}
        <div className="w-full">
          <div className="font-semibold line-clamp-1">{server.name}</div>
          <div className="text-xs line-clamp-1 text-muted">{server.type}</div>
        </div>
      </div>
      <Button
        type="submit"
        variant={invited ? "filled" : "outlined"}
        isSubmitting={sendLoading || unsendLoading}
        onClick={invited ? unsendInvite : inviteUser}
      >
        {invited ? "Invited" : "Invite"}
      </Button>
    </div>
  );
}
