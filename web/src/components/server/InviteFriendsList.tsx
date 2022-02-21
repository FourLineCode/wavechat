import { gql, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { Friendship, GetFriendsQuery, Server } from "src/apollo/__generated__/types";
import { InviteFriendToServerCard } from "src/components/server/InviteFriendToServerCard";
import { Spinner } from "src/components/ui/Spinner";

interface Props {
    server: Server;
}

const GET_FRIENDS = gql`
    query GetFriends {
        friendsList {
            id
            firstUserId
            firstUser {
                id
                username
                displayName
                avatarUrl
                university
            }
            secondUserId
            secondUser {
                id
                username
                displayName
                avatarUrl
                university
            }
        }
    }
`;

export function InviteFriendsList({ server }: Props) {
    const { data, loading } = useQuery<GetFriendsQuery>(GET_FRIENDS, {
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return loading ? (
        <div className="flex items-center justify-center w-full py-8">
            <Spinner />
        </div>
    ) : data && data.friendsList.length > 0 ? (
        <div className="w-full space-y-1 max-h-[500px] overflow-y-auto">
            {data.friendsList.map((friendship) => (
                <InviteFriendToServerCard
                    friendship={friendship as Friendship}
                    key={friendship.id}
                />
            ))}
        </div>
    ) : (
        <div className="flex items-center justify-center w-full py-8 text-xl font-semibold text-secondary">
            No friends to invite
        </div>
    );
}
