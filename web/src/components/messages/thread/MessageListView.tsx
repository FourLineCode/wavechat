import { useEffect, useRef } from 'react';
import { Message } from 'src/apollo/__generated__/types';
import { MessageCard } from 'src/components/messages/thread/MessageCard';

interface Props {
	messages: Message[];
}

export function MessageListView({ messages }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView({
				behavior: 'auto',
			});
		}
	}, [messages]);

	return (
		<div
			ref={container}
			className='flex flex-col flex-1 w-full pl-4 pr-2 space-y-4 overflow-x-hidden overflow-y-auto text-xl scrollbar-thin'
		>
			{messages.map((message, index) => (
				<MessageCard message={message} topMessage={index === 0} key={message.id} />
			))}
			<div ref={ref} />
		</div>
	);
}
