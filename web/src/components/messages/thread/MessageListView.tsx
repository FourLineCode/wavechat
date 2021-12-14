import { useEffect, useRef } from "react";
import { MessageCard } from "src/components/messages/thread/MessageCard";
import { MessageGroup } from "src/components/messages/thread/MessageThreadPage";

interface Props {
	messageGroups: MessageGroup[];
}

export function MessageListView({ messageGroups }: Props) {
	const bottom = useRef<HTMLDivElement>(null);
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (bottom.current) {
			bottom.current.scrollIntoView({
				behavior: "auto",
			});
		}
	}, [messageGroups]);

	return (
		<div
			ref={container}
			className="flex flex-col flex-1 w-full space-y-2 overflow-x-hidden overflow-y-auto text-xl scrollbar-thin"
		>
			{messageGroups.map((group) => (
				<MessageCard messageGroup={group} key={group.id} />
			))}
			<div ref={bottom} />
		</div>
	);
}
