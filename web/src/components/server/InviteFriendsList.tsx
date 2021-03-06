import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import {
  GetInvitableUserListQuery,
  GetInvitableUserListQueryVariables,
  Server,
  User,
} from "src/apollo/__generated__/types";
import { InviteFriendToServerCard } from "src/components/server/InviteFriendToServerCard";
import { InviteToServerByUsernameField } from "src/components/server/InviteToServerByUsernameField";
import { Spinner } from "src/components/ui/Spinner";

interface Props {
  server: Server;
}

const GET_INVITABLE_USER_LIST = gql`
  query GetInvitableUserList($serverId: String!) {
    invitableUserList(serverId: $serverId) {
      id
      username
      displayName
      avatarUrl
      university
    }
  }
`;

export function InviteFriendsList({ server }: Props) {
  const { data, loading } = useQuery<GetInvitableUserListQuery, GetInvitableUserListQueryVariables>(
    GET_INVITABLE_USER_LIST,
    {
      variables: {
        serverId: server.id,
      },
      onError: () => {
        toast.error("Failed to fetch users");
      },
      fetchPolicy: "no-cache",
    }
  );

  return (
    <>
      <div className="text-2xl font-bold text-center">Invite to server</div>
      <InviteToServerByUsernameField server={server} />
      {loading ? (
        <div className="flex items-center justify-center w-full h-[50vh]">
          <Spinner />
        </div>
      ) : data && data.invitableUserList.length > 0 ? (
        <div className="w-full space-y-1 max-h-[50vh] overflow-y-auto">
          {data.invitableUserList.map((user) => (
            <InviteFriendToServerCard user={user as User} server={server} key={user.id} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-8 text-xl font-semibold text-secondary">
          No friends to invite
        </div>
      )}
    </>
  );
}
