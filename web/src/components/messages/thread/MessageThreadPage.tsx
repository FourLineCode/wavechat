import { UserSocketEvents } from '@shared/socket/events';
import { MessageDTO } from '@shared/types/message';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { BiMessage } from 'react-icons/bi';
import { Message, MessageThread } from 'src/apollo/__generated__/types';
import { MessageListView } from 'src/components/messages/thread/MessageListView';
import { MessageThreadTopBar } from 'src/components/messages/thread/MessageThreadTopBar';
import { useSocket } from 'src/socket/useSocket';
import { useAuth } from 'src/store/useAuth';

interface Props {
	thread: MessageThread;
}

export function MessageThreadPage({ thread }: Props) {
	const socket = useSocket();
	const currentUser = useAuth().user;
	const currentUserId = currentUser?.id;
	const inputRef = useRef<HTMLInputElement>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [user] = thread.participants.filter((u) => u.id !== currentUserId);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		socket.connect();

		socket.conn.emit(UserSocketEvents.JoinRoom, { roomId: thread.id });

		socket.conn.on(UserSocketEvents.RecieveMessage, (message: Message) => {
			setMessages((prev) => [...prev, message]);
		});

		return () => {
			socket.conn.emit(UserSocketEvents.LeaveRoom, { roomId: thread.id });
			socket.disconnect();
		};
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
					<Formik
						initialValues={{ messageBody: '' }}
						onSubmit={async ({ messageBody }, form) => {
							if (!messageBody.trim()) return;
							if (!currentUser) return;

							const messageDTO: MessageDTO = {
								body: messageBody.trim(),
								threadId: thread.id,
								authorId: currentUser.id,
								author: {
									id: currentUser.id,
									username: currentUser.username,
									displayName: currentUser.displayName,
									avatarUrl: currentUser.avatarUrl,
								},
							};
							socket.conn.emit(UserSocketEvents.SendMessage, messageDTO);

							form.resetForm();
						}}
					>
						<Form>
							<Field
								as='input'
								type='text'
								name='messageBody'
								innerRef={inputRef}
								autoComplete='off'
								placeholder='Send a message'
								className='w-full px-4 py-3 rounded-lg focus:ring-2 focus:outline-none ring-brand-500 bg-dark-600 bg-opacity-30 hover:bg-opacity-20'
							/>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
}
