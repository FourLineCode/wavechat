import { FriendRequest } from "src/apollo/__generated__/types";
import { ProfileModal } from "src/components/profile/ProfileModal";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { Button } from "src/components/ui/Button";
import { Card } from "src/components/ui/Card";
import { useAcceptRequestMutation } from "src/hooks/useAcceptRequestMutation";
import { useDeclineRequestMutation } from "src/hooks/useDeclineRequestMutation";
import { useModal } from "src/hooks/useModal";

interface Props {
    request: FriendRequest;
}

export function FriendRequestCard({ request }: Props) {
    const friendRequestProfile = useModal();

    const { acceptRequest, loading: acceptRequestLoading } = useAcceptRequestMutation({
        reqId: request.id,
        userId: request.fromUserId,
    });
    const { declineRequest, loading: declineRequestLoading } = useDeclineRequestMutation({
        reqId: request.id,
        userId: request.fromUserId,
    });

    return (
        <Card className="w-full !p-2 space-y-2">
            <div className="flex items-center space-x-2">
                <UserAvatar
                    user={request.fromUser}
                    onClick={friendRequestProfile.onOpen}
                    className="w-10 h-10 rounded-lg cursor-pointer shrink-0 hover:ring-2 ring-brand-500"
                />
                <div>
                    <div
                        onClick={friendRequestProfile.onOpen}
                        className="font-semibold cursor-pointer line-clamp-1 hover:underline"
                    >
                        {request.fromUser.displayName}
                    </div>
                    <div className="text-xs line-clamp-1 text-secondary">
                        {request.fromUser.university ?? "unknown"}
                    </div>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button
                    type="submit"
                    isSubmitting={acceptRequestLoading}
                    onClick={acceptRequest}
                    className="w-full text-sm 2xl:text-base"
                >
                    <span className="line-clamp-1">Accept</span>
                </Button>
                <Button
                    type="submit"
                    variant="outlined"
                    isSubmitting={declineRequestLoading}
                    onClick={declineRequest}
                    className="w-full text-sm 2xl:text-base"
                >
                    <span className="line-clamp-1">Decline</span>
                </Button>
            </div>
            <ProfileModal userId={request.fromUserId} {...friendRequestProfile} />
        </Card>
    );
}
