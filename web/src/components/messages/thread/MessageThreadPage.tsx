import { useState } from 'react';
import { BiMessage } from 'react-icons/bi';
import { Message, MessageThread, User } from 'src/apollo/__generated__/types';
import { MessageListView } from 'src/components/messages/thread/MessageListView';
import { MessageThreadTopBar } from 'src/components/messages/thread/MessageThreadTopBar';
import { useAuth } from 'src/store/useAuth';

interface Props {
	thread: MessageThread;
}

export function MessageThreadPage({ thread }: Props) {
	const currentUserId = useAuth().user?.id;
	const [messages, setMessages] = useState<Message[]>(
		Array.from({ length: 10 }).map((_, i) => ({
			pk: i,
			id: String(i),
			body: `hello threre ${i}`,
			threadId: '0',
			thread: {} as MessageThread,
			authorId: '1212',
			author: {} as User,
			updatedAt: new Date().toLocaleString(),
			createdAt: new Date().toLocaleString(),
		}))
	);
	const [user] = thread.participants.filter((u) => u.id !== currentUserId);

	return (
		<div className='flex flex-col w-full h-full'>
			<MessageThreadTopBar user={user} />
			<div className='flex flex-col flex-1 w-full min-h-0 pb-4'>
				{messages.length > 0 ? (
					<MessageListView messages={messages} />
				) : (
					<div className='flex items-center justify-center flex-1 text-muted'>
						<BiMessage size='156px' />
						<div className='text-xl font-semibold'>Send a message</div>
					</div>
				)}
				<div className='px-4'>
					<form
						onSubmit={(e) => {
							e.preventDefault();

							setMessages((prev) => [
								...prev,
								{
									id: String(messages.length),
									body: `hello threre ${String(messages.length)}`,
									pk: messages.length,
									threadId: '0',
									thread: {} as MessageThread,
									authorId: '1212',
									author: {} as User,
									updatedAt: new Date().toLocaleString(),
									createdAt: new Date().toLocaleString(),
								},
							]);
						}}
					>
						<input
							type='text'
							placeholder='Send a Message'
							className='w-full px-4 py-3 rounded-lg focus:ring-2 focus:outline-none ring-brand-500 bg-dark-600 bg-opacity-30 hover:bg-opacity-20'
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
