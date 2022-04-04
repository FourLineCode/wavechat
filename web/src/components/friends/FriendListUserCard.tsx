import { ContextMenuTrigger } from "react-contextmenu";
import { Friendship } from "src/apollo/__generated__/types";
import { ProfileModal } from "src/components/profile/ProfileModal";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { ContextMenu, ContextMenuItem } from "src/components/ui/ContextMenu";
import { useMessageUserMutation } from "src/hooks/useMessageUserMutation";
import { useModal } from "src/hooks/useModal";
import { useUnfriendMutation } from "src/hooks/useUnfriendMutation";
import { useAuth } from "src/store/useAuth";

interface Props {
  friendship: Friendship;
}

export function FriendListUserCard({ friendship }: Props) {
  const id = useAuth().user?.id;
  const friendListProfile = useModal();
  const friend = friendship.firstUserId === id ? friendship.secondUser : friendship.firstUser;
  const unfriend = useUnfriendMutation(friend.id);
  const getOrCreateMessageThread = useMessageUserMutation();

  return (
    <ContextMenuTrigger id={`friend-list-card-${friend.id}`}>
      <div
        onClick={friendListProfile.onOpen}
        className="w-full p-2 space-y-2 transition-colors rounded-lg cursor-pointer bg-dark-800 hover:bg-dark-700"
      >
        <div className="flex items-center space-x-2">
          <UserAvatar
            user={friend}
            className="object-cover w-10 h-10 rounded-lg cursor-pointer shrink-0"
          />
          <div className="w-full">
            <div className="font-semibold cursor-pointer line-clamp-1">{friend.displayName}</div>
            <div className="text-xs line-clamp-1 text-secondary">
              {friend.university ?? "unknown"}
            </div>
          </div>
        </div>
      </div>
      <ProfileModal userId={friend.id} {...friendListProfile} />
      <ContextMenu id={`friend-list-card-${friend.id}`}>
        <ContextMenuItem onClick={friendListProfile.onOpen}>View Profile</ContextMenuItem>
        <ContextMenuItem
          onClick={() => getOrCreateMessageThread({ variables: { userId: friend.id } })}
        >
          Message
        </ContextMenuItem>
        <ContextMenuItem onClick={unfriend}>Unfriend</ContextMenuItem>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}
