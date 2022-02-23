import { gql, useMutation } from "@apollo/client";
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
import { UserAvatar } from "src/components/profile/UserAvatar";
import { Button } from "src/components/ui/Button";

interface Props {
    user: User;
    server: Server;
}

const INVITE_USER_TO_SERVER_BY_ID = gql`
    mutation InviteUserToServerById($serverId: String!, $userId: String!) {
        inviteUserToServerById(serverId: $serverId, userId: $userId) {
            id
        }
    }
`;

const DELETE_INVITE_BY_ID = gql`
    mutation DeleteInviteById($serverId: String!, $userId: String!) {
        deleteInviteToUserById(serverId: $serverId, userId: $userId) {
            id
        }
    }
`;

export function InviteFriendToServerCard({ user, server }: Props) {
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
            toast.error("Failed to send invite");
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
                <UserAvatar user={user} className="w-10 h-10 rounded-lg shrink-0" />
                <div className="w-full">
                    <div className="font-semibold line-clamp-1">{user.displayName}</div>
                    <div className="text-xs line-clamp-1 text-secondary">
                        {user.university ?? "unknown"}
                    </div>
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
