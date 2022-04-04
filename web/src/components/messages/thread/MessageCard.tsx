import { formatDistanceToNow } from "date-fns";
import React from "react";
import { MessageMedia } from "src/components/messages/thread/MessageMedia";
import { MessageGroup } from "src/components/messages/thread/MessageThreadPage";
import { ProfileModal } from "src/components/profile/ProfileModal";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { useModal } from "src/hooks/useModal";

interface Props {
  messageGroup: MessageGroup;
}

export function MessageCard({ messageGroup }: Props) {
  const messageAuthorModal = useModal();

  return (
    <div className="flex py-1 pl-4 pr-4 space-x-4 cursor-default hover:bg-dark-800 first:mt-auto hover:bg-opacity-30">
      <div className="shrink-0 pt-1.5">
        <UserAvatar
          user={messageGroup.author}
          onClick={messageAuthorModal.onOpen}
          className="object-cover w-10 h-10 rounded-lg cursor-pointer shrink-0 ring-brand-500 hover:ring-1"
        />
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <span
            onClick={messageAuthorModal.onOpen}
            className="text-base font-semibold cursor-pointer text-secondary line-clamp-1 hover:underline"
          >
            {messageGroup.author.displayName}
          </span>
          <div>
            <span className="text-xs text-muted">
              {formatDistanceToNow(new Date(messageGroup.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <div className="space-y-1.5">
          {messageGroup.messages.map((message) => (
            <div key={message.id}>
              {message.body.trim().length > 0 && (
                <pre className="text-base break-all whitespace-pre-wrap font-roboto">
                  {message.body}
                </pre>
              )}
              {message.attachments && message.attachments.length > 0 && (
                <div className="py-2 space-y-1">
                  {message.attachments.map((media) => (
                    <MessageMedia message={message} media={media} key={media.id} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <ProfileModal userId={messageGroup.authorId} {...messageAuthorModal} />
    </div>
  );
}
