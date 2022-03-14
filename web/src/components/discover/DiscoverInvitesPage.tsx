import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GetPendingServerInvitesQuery, ServerInvite } from "src/apollo/__generated__/types";
import { DiscoverInviteCard } from "src/components/discover/DiscoverInviteCard";
import { Spinner } from "src/components/ui/Spinner";

const GET_PENDING_SERVER_INVITES = gql`
    query GetPendingServerInvites {
        pendingServerInvites {
            id
            createdAt
            toUserId
            fromUserId
            fromUser {
                id
                username
                displayName
                avatarUrl
            }
            serverId
            server {
                id
                name
                type
                iconUrl
                memberCount
            }
        }
    }
`;

export function DiscoverInvitesPage() {
    const { data, loading } = useQuery<GetPendingServerInvitesQuery>(GET_PENDING_SERVER_INVITES, {
        onError: () => {
            toast.error("Failed to fetch invites");
        },
    });

    return (
        <div className="flex-1 p-6 bg-dark-700">
            <div className="mb-2 text-3xl font-bold">Pending Invites</div>
            <div className="h-full space-y-4 overflow-y-auto text-xs">
                {loading ? (
                    <Spinner />
                ) : data?.pendingServerInvites && data.pendingServerInvites.length <= 0 ? (
                    <div className="mt-24 text-3xl font-bold text-center text-muted">
                        No pending invites
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2 overflow-y-auto 2xl:grid-cols-4">
                        {data?.pendingServerInvites.map((invite) => (
                            <>
                                <DiscoverInviteCard
                                    invite={invite as ServerInvite}
                                    key={invite.id}
                                />
                                <DiscoverInviteCard
                                    invite={invite as ServerInvite}
                                    key={invite.id}
                                />
                                <DiscoverInviteCard
                                    invite={invite as ServerInvite}
                                    key={invite.id}
                                />
                                <DiscoverInviteCard
                                    invite={invite as ServerInvite}
                                    key={invite.id}
                                />
                            </>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
