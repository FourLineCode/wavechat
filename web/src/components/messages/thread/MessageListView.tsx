import { useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { MessageCard } from "src/components/messages/thread/MessageCard";
import { MessageGroup } from "src/components/messages/thread/MessageThreadPage";

interface Props {
    messageGroups: MessageGroup[];
}

export function MessageListView({ messageGroups }: Props) {
    const bottom = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottom.current) {
            bottom.current.scrollIntoView({
                behavior: "auto",
            });
        }
    }, [messageGroups]);

    useEffect(() => {
        setTimeout(() => {
            flushSync(() => {
                if (bottom.current) {
                    bottom.current.scrollIntoView({
                        behavior: "auto",
                    });
                }
            });
        }, 100);
    }, []);

    return (
        <div className="flex flex-col flex-1 w-full min-h-fit space-y-2 overflow-x-hidden overflow-y-auto text-xl scrollbar-thin">
            {messageGroups.map((group) => (
                <MessageCard messageGroup={group} key={group.id} />
            ))}
            <div ref={bottom} />
        </div>
    );
}
