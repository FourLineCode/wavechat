import { User } from "src/apollo/__generated__/types";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { Button } from "src/components/ui/Button";

interface Props {
    user: User;
}

export function InviteFriendToServerCard({ user }: Props) {
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
            <Button variant="outlined" className="">
                Invite
            </Button>
        </div>
    );
}
