import React, { useEffect, useRef, useState } from 'react';
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
	const inputRef = useRef<HTMLInputElement>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [user] = thread.participants.filter((u) => u.id !== currentUserId);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

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
						onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
							e.preventDefault();

							const formData = new FormData(e.target);
							const msg = formData.get('msg')?.toString() || '';
							e.target.reset();

							if (!msg.trim()) return;
							setMessages((prev) => [
								...prev,
								{
									id: String(messages.length),
									body: msg,
									pk: messages.length,
									threadId: '0',
									thread: {} as MessageThread,
									updatedAt: new Date().toLocaleString(),
									createdAt: new Date().toLocaleString(),
									authorId: '1212',
									author: {
										id: String(messages.length),
										displayName: 'John snow',
										avatarUrl: user.avatarUrl,
									} as User,
								},
							]);
						}}
					>
						<input
							ref={inputRef}
							type='text'
							name='msg'
							placeholder='Send a Message'
							className='w-full px-4 py-3 rounded-lg focus:ring-2 focus:outline-none ring-brand-500 bg-dark-600 bg-opacity-30 hover:bg-opacity-20'
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
