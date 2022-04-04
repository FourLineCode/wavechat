import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GetJoinedServersQuery, Server } from "src/apollo/__generated__/types";
import { NavigationServerRoute } from "src/components/navigations/NavigationServerRoute";

export const GET_JOINED_SERVERS = gql`
  query GetJoinedServers {
    joinedServers {
      id
      name
      type
      iconUrl
    }
  }
`;

export function NavigationServersList() {
  const { data, loading } = useQuery<GetJoinedServersQuery>(GET_JOINED_SERVERS, {
    onError: () => {
      toast.error("Failed to fetch servers");
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
        <NavigationServerRoute server={server as Server} key={server.id} />
      ))}
    </>
  );
}
