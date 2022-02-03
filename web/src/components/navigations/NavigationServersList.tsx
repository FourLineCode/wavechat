import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GetJoinedServersQuery } from "src/apollo/__generated__/types";
import { NavigationSidebarRoute } from "src/components/navigations/NavigationSidebarRoute";

export const GET_JOINED_SERVERS = gql`
    query GetJoinedServers {
        joinedServers {
            id
            name
            iconUrl
        }
    }
`;

export function NavigationServersList() {
    const { data, loading } = useQuery<GetJoinedServersQuery>(GET_JOINED_SERVERS, {
        onError: (error) => {
            toast.error(error.message);
        },
        onCompleted: (data) => {
            console.log(data.joinedServers);
        },
    });

    return loading ? (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <div className="w-12 h-12 my-2 rounded-full bg-dark-700 animate-pulse" key={i} />
            ))}
        </>
    ) : (
        <>
            {data?.joinedServers.map((server) => (
                <NavigationSidebarRoute
                    key={server.id}
                    route={`/server/${server.id}`}
                    tooltip={server.name}
                    imageSrc={server.iconUrl}
                />
            ))}
        </>
    );
}
