import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GetJoinedServersQuery, Server, User } from "src/apollo/__generated__/types";
import { InviteToServerCard } from "src/components/discover/InviteToServerCard";
import { GET_JOINED_SERVERS } from "src/components/navigations/NavigationServersList";
import { Spinner } from "src/components/ui/Spinner";

interface Props {
    user: User;
}

export function InviteServerList({ user }: Props) {
    const { data, loading } = useQuery<GetJoinedServersQuery>(GET_JOINED_SERVERS, {
        onError: () => {
            toast.error("Failed to fetch servers");
        },
    });

    return (
        <div className="w-full flex flex-col h-[50vh]">
            <div className="text-2xl font-bold text-center">Invite to server</div>
            {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                    <Spinner />
                </div>
            ) : data?.joinedServers && !data?.joinedServers.length ? (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="text-xl font-semibold text-muted">No servers found</div>
                </div>
            ) : (
                <div className="flex-1 w-full space-y-1 overflow-y-auto">
                    {data?.joinedServers.map((server) => (
                        <InviteToServerCard user={user} server={server as Server} key={server.id} />
                    ))}
                </div>
            )}
        </div>
    );
}
