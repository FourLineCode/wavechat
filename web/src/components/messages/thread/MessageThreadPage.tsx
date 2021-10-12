import { MessageThread } from 'src/apollo/__generated__/types';

interface Props {
	thread: MessageThread;
}

export function MessageThreadPage({ thread }: Props) {
	return (
		<>
			<div className='text-xl font-bold text-primary'>Thread - {thread.id}</div>
			<div>Participants:</div>
			<div>{thread.participants[0].displayName}</div>
			<div>{thread.participants[1].displayName}</div>
		</>
	);
}
