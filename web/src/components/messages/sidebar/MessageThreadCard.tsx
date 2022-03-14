import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { CaretRight } from "phosphor-react";
import { ContextMenuTrigger } from "react-contextmenu";
import { MessageThread } from "src/apollo/__generated__/types";
import { ProfileModal } from "src/components/profile/ProfileModal";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { ContextMenu, ContextMenuItem } from "src/components/ui/ContextMenu";
import { useModal } from "src/hooks/useModal";
import { useUnfriendMutation } from "src/hooks/useUnfriendMutation";
import { useAuth } from "src/store/useAuth";

interface Props {
    thread: MessageThread;
}

export function MessageThreadCard({ thread }: Props) {
    const router = useRouter();
    const messageThreadProfile = useModal();
    const currentUserId = useAuth().user?.id;
    const active = typeof window !== undefined && window.location.pathname.endsWith(thread.id);
    const [user] = thread.participants.filter((u) => u.id !== currentUserId);
    const unfriend = useUnfriendMutation(user.id);

    return (
        <ContextMenuTrigger id={`message-thread-${user.id}`}>
            <Link passHref href={`/messages/thread/${thread.id}`}>
                <a>
                    <div
                        className={clsx(
                            active && "bg-dark-700",
                            "w-full p-2 space-y-2 rounded-lg cursor-pointer bg-dark-800 hover:bg-dark-700 transition-colors group"
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <UserAvatar
                                user={user}
                                className="object-cover w-10 h-10 rounded-lg shrink-0"
                            />
                            <div className="flex items-center w-full">
                                <div className="flex-1">
                                    <div className="font-semibold cursor-pointer line-clamp-1">
                                        {user.displayName}
                                    </div>
                                    <div className="text-xs text-muted">
                                        {String(formatDistanceToNow(new Date(thread.updatedAt)))}
                                    </div>
                                </div>
                                <CaretRight
                                    size={20}
                                    weight="bold"
                                    className="hidden text-secondary group-hover:block"
                                />
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            <ProfileModal userId={user.id} {...messageThreadProfile} />
            <ContextMenu id={`message-thread-${user.id}`}>
                <ContextMenuItem onClick={messageThreadProfile.onOpen}>
                    View Profile
                </ContextMenuItem>
                <ContextMenuItem onClick={() => router.push(`/messages/thread/${thread.id}`)}>
                    Message
                </ContextMenuItem>
                <ContextMenuItem onClick={unfriend}>Unfriend</ContextMenuItem>
            </ContextMenu>
        </ContextMenuTrigger>
    );
}
