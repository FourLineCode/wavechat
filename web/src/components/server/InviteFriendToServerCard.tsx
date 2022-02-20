import { Friendship } from "src/apollo/__generated__/types";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { Button } from "src/components/ui/Button";
import { useAuth } from "src/store/useAuth";

interface Props {
    friendship: Friendship;
}

export function InviteFriendToServerCard({ friendship }: Props) {
    const id = useAuth().user?.id;
    const friend = friendship.firstUserId === id ? friendship.secondUser : friendship.firstUser;

    return (
        <div className="flex justify-between w-full py-2 pr-2 rounded-lg">
            <div className="flex items-center space-x-2">
                <UserAvatar user={friend} className="w-10 h-10 rounded-lg shrink-0" />
                <div className="w-full">
                    <div className="font-semibold line-clamp-1">{friend.displayName}</div>
                    <div className="text-xs line-clamp-1 text-secondary">
                        {friend.university ?? "unknown"}
                    </div>
                </div>
            </div>
            <Button variant="outlined">Invite</Button>
        </div>
    );
}
