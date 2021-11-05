import { gql, useQuery } from '@apollo/client';
import { ErrorSocketEvents, MessageSocketEvents } from '@shared/socket/events';
import { MessageDTO } from '@shared/types/message';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BiMessage, BiMessageError } from 'react-icons/bi';
import { BarLoader } from 'react-spinners';
import {
	Message,
	MessageThread,
	ThreadMessagesQuery,
	ThreadMessagesQueryVariables,
	User,
} from 'src/apollo/__generated__/types';
import { MessageListView } from 'src/components/messages/thread/MessageListView';
import { MessageThreadTopBar } from 'src/components/messages/thread/MessageThreadTopBar';
import { useSocket } from 'src/socket/useSocket';
import { useAuth } from 'src/store/useAuth';

const THREAD_MESSAGES = gql`
	query ThreadMessages($threadId: String!) {
		threadMessages(threadId: $threadId) {
			id
			pk
			body
			createdAt
			updatedAt
			threadId
			authorId
			author {
				id
				username
				displayName
				avatarUrl
			}
		}
	}
`;

interface Props {
	thread: MessageThread;
}

export interface MessageGroup {
	id: string;
	authorId: string;
	author: User;
	messages: Message[];
	createdAt: string;
}

export function MessageThreadPage({ thread }: Props) {
	const socket = useSocket();
	const currentUser = useAuth().user;
	const currentUserId = currentUser?.id;
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const formRef = useRef<FormikProps<{ messageBody: string }>>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [error, setError] = useState(false);
	const [messagesLoading, setMessagesLoading] = useState(true);
	const [user] = thread.participants.filter((u) => u.id !== currentUserId);

	useQuery<ThreadMessagesQuery, ThreadMessagesQueryVariables>(THREAD_MESSAGES, {
		variables: {
			threadId: thread.id,
		},
		onCompleted: (data) => {
			setMessagesLoading(false);
			setMessages(data.threadMessages as Message[]);
		},
		onError: (error) => {
			setError(true);
			setMessagesLoading(false);
			toast.error(error.message);
		},
		fetchPolicy: 'no-cache',
	});

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const messageGroups: MessageGroup[] = useMemo(() => {
		const groups: MessageGroup[] = [];
		for (let i = 0; i < messages.length; ) {
			const currentGroupMessages: Message[] = [];
			const currentAuthor = messages[i].author;
			while (i < messages.length && messages[i].authorId === currentAuthor.id) {
				currentGroupMessages.push(messages[i]);
				i++;
			}
			const newGroup: MessageGroup = {
				id: currentGroupMessages[0].id,
				authorId: currentAuthor.id,
				author: currentAuthor,
				messages: currentGroupMessages,
				createdAt: currentGroupMessages[0].createdAt,
			};
			groups.push(newGroup);
		}

		return groups;
	}, [messages]);

	useEffect(() => {
		socket.connect();

		socket.conn.on(MessageSocketEvents.Connected, () => {
			socket.conn.emit(MessageSocketEvents.JoinRoom, { roomId: thread.id });
		});

		socket.conn.on(MessageSocketEvents.RecieveMessage, (message: Message) => {
			setMessages((prev) => [...prev, message]);
		});

		socket.conn.on(ErrorSocketEvents.AuthorizationError, (message: string) => {
			setError(true);
			toast.error(message);
		});

		socket.conn.on(ErrorSocketEvents.JoinRoomError, (message: string) => {
			setError(true);
			toast.error(message);
		});

		return () => {
			socket.conn.emit(MessageSocketEvents.LeaveRoom, { roomId: thread.id });
			socket.disconnect();
		};
	}, []);

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key == 'Enter' && !e.shiftKey) {
			e.preventDefault();
			formRef.current?.submitForm();
		}
	};

	return (
		<div className='flex flex-col w-full h-full'>
			<MessageThreadTopBar user={user} />
			<div className='flex flex-col flex-1 w-full min-h-0 pb-4'>
				{messages.length > 0 && !error && !messagesLoading ? (
					<MessageListView messageGroups={messageGroups} />
				) : !error && !messagesLoading ? (
					<div className='flex flex-col items-center justify-center flex-1 text-muted'>
						<BiMessage size='156px' />
						<div className='text-xl font-semibold'>Send a message</div>
					</div>
				) : error && !messagesLoading ? (
					<div className='flex flex-col items-center justify-center flex-1 text-muted'>
						<BiMessageError size='156px' />
						<div className='text-xl font-semibold'>Something went wrong!</div>
					</div>
				) : (
					messagesLoading && (
						<div className='flex items-center justify-center flex-1'>
							<BarLoader color='white' />
						</div>
					)
				)}
				<div className='px-4'>
					<Formik
						initialValues={{ messageBody: '' }}
						innerRef={formRef}
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
							socket.conn.emit(MessageSocketEvents.SendMessage, messageDTO);

							form.resetForm();
						}}
					>
						<Form>
							<Field
								as='textarea'
								rows='1'
								type='text'
								name='messageBody'
								innerRef={inputRef}
								autoComplete='off'
								disabled={error}
								placeholder='Send a message'
								onKeyDown={onKeyDownHandler}
								className='w-full px-4 pt-3 align-middle rounded-lg resize-none focus:ring-2 focus:outline-none ring-brand-500 bg-dark-600 bg-opacity-30 hover:bg-opacity-20'
							/>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
}
