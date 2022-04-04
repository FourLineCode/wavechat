import { gql, useMutation } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import { CircleWavyQuestion, Clock, User } from "phosphor-react";
import toast from "react-hot-toast";
import {
  AcceptServerInviteMutation,
  AcceptServerInviteMutationVariables,
  DeclineServerInviteMutation,
  DeclineServerInviteMutationVariables,
  ServerInvite,
} from "src/apollo/__generated__/types";
import { GET_PENDING_SERVER_INVITES } from "src/components/discover/DiscoverInvitesPage";
import { GET_JOINED_SERVERS } from "src/components/navigations/NavigationServersList";
import { ProfileModal } from "src/components/profile/ProfileModal";
import { Button } from "src/components/ui/Button";
import { useModal } from "src/hooks/useModal";

interface Props {
  invite: ServerInvite;
}

export const ACCEPT_SERVER_INVITE = gql`
  mutation AcceptServerInvite($inviteId: String!) {
    acceptServerInvite(inviteId: $inviteId)
  }
`;

export const DECLINE_SERVER_INVITE = gql`
  mutation DeclineServerInvite($inviteId: String!) {
    declineServerInvite(inviteId: $inviteId)
  }
`;

export function DiscoverInviteCard({ invite }: Props) {
  const router = useRouter();
  const inviterUserProfileModal = useModal();

  const [acceptInvite, { loading: acceptLoading }] = useMutation<
    AcceptServerInviteMutation,
    AcceptServerInviteMutationVariables
  >(ACCEPT_SERVER_INVITE, {
    variables: {
      inviteId: invite.id,
    },
    onCompleted: () => {
      router.push(`/server/${invite.serverId}`);
    },
    onError: () => {
      toast.error("Failed to accept invite");
    },
    refetchQueries: [{ query: GET_PENDING_SERVER_INVITES }, { query: GET_JOINED_SERVERS }],
  });

  const [declineInvite, { loading: declineLoading }] = useMutation<
    DeclineServerInviteMutation,
    DeclineServerInviteMutationVariables
  >(DECLINE_SERVER_INVITE, {
    variables: {
      inviteId: invite.id,
    },
    onError: () => {
      toast.error("Failed to decline invite");
    },
    refetchQueries: [{ query: GET_PENDING_SERVER_INVITES }],
  });

  return (
    <div className="w-full mb-4 overflow-hidden rounded-lg min-w-64 bg-dark-800">
      {invite.server.bannerUrl ? (
        <img
          src={invite.server.bannerUrl}
          alt="server-icon"
          className="flex-shrink-0 object-cover w-full h-24"
        />
      ) : (
        <div className="w-full h-24 bg-gradient-to-b from-dark-800 to-dark-900" />
      )}
      <div className="flex items-center p-2 space-x-2">
        {invite.server.iconUrl ? (
          <img
            src={invite.server.iconUrl}
            alt="server-icon"
            className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-dark-700">
            <CircleWavyQuestion size={28} weight="bold" className="text-secondary" />
          </div>
        )}
        <div>
          <div
            className="text-lg font-semibold break-all cursor-pointer hover:underline line-clamp-1"
            onClick={() => toast.error("server info coming soon")}
          >
            {invite.server.name}
          </div>
          <div className="text-xs text-secondary">{invite.server.type}</div>
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center space-x-2">
          <User size={16} className="shrink-0 text-secondary" weight="bold" />
          <div className="space-x-1 text-sm break-all line-clamp-1">
            <span className="text-secondary">Invited by</span>
            <span
              className="font-semibold cursor-pointer text-primary hover:underline"
              onClick={inviterUserProfileModal.onOpen}
            >
              {invite.fromUser.displayName}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={16} className="shrink-0 text-secondary" weight="bold" />
          <div className="text-secondary">
            {formatDistanceToNow(new Date(invite.createdAt), { addSuffix: true })}
          </div>
        </div>
        <div className="flex flex-row-reverse items-center pt-3 text-base">
          <Button
            type="submit"
            onClick={acceptInvite}
            className="w-full ml-2"
            isSubmitting={acceptLoading}
            disabled={acceptLoading || declineLoading}
          >
            Accept
          </Button>
          <Button
            type="submit"
            variant="outlined"
            className="w-full"
            onClick={declineInvite}
            isSubmitting={declineLoading}
            disabled={acceptLoading || declineLoading}
          >
            Decline
          </Button>
        </div>
      </div>
      <ProfileModal userId={invite.fromUserId} {...inviterUserProfileModal} />
    </div>
  );
}
