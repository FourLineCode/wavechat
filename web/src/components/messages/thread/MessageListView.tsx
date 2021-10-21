import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Message } from 'src/apollo/__generated__/types';

interface Props {
	messages: Message[];
}

export function MessageListView({ messages }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}, [messages]);

	return (
		<div
			ref={container}
			className='flex flex-col flex-1 w-full pl-4 pr-2 space-y-2 overflow-y-auto text-xl scrollbar-thin'
		>
			{messages.map((message, index) => (
				<div className={clsx(index == 0 && 'mt-auto')}>{message.body}</div>
			))}
			<div ref={ref} />
		</div>
	);
}
