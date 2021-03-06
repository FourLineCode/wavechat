import { gql, useQuery } from "@apollo/client";
import { ErrorSocketEvents, MessageDTO, MessageSocketEvents } from "@wavechat/shared";
import { Field, Form, Formik, FormikProps } from "formik";
import { ChatCenteredText, CircleWavyWarning } from "phosphor-react";
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Message,
  MessageThread,
  ThreadMessagesQuery,
  ThreadMessagesQueryVariables,
  User,
} from "src/apollo/__generated__/types";
import { MediaInput } from "src/components/messages/thread/MediaInput";
import { MessageListView } from "src/components/messages/thread/MessageListView";
import { MessageThreadTopBar } from "src/components/messages/thread/MessageThreadTopBar";
import { Spinner } from "src/components/ui/Spinner";
import { useSocket } from "src/socket/useSocket";
import { useAuth } from "src/store/useAuth";

const THREAD_MESSAGES = gql`
  query ThreadMessages($threadId: String!) {
    threadMessages(threadId: $threadId) {
      id
      pk
      body
      attachments {
        id
        url
        filename
        mimetype
      }
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [prevMessages, setPrevMessages] = useState<string[]>([]);
  const [prevMessageIndex, setPrevMessageIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<FormikProps<{ messageBody: string }>>(null);
  const [user] = thread.participants.filter((u) => u.id !== currentUserId);

  useQuery<ThreadMessagesQuery, ThreadMessagesQueryVariables>(THREAD_MESSAGES, {
    variables: {
      threadId: thread.id,
    },
    onCompleted: (data) => {
      setMessagesLoading(false);
      setMessages(data.threadMessages as Message[]);
    },
    onError: () => {
      setError(true);
      setMessagesLoading(false);
      toast.error("Failed to fetch messages");
    },
    fetchPolicy: "no-cache",
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

    socket.conn.on(ErrorSocketEvents.SendMessageError, (message: string) => {
      setError(true);
      toast.error(message);
    });

    return () => {
      socket.conn.emit(MessageSocketEvents.LeaveRoom, { roomId: thread.id });
      socket.disconnect();
    };
  }, []);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
    }

    if (e.key == "ArrowUp") {
      setPrevMessageIndex((prev) => Math.min(prevMessages.length - 1, prev + 1));
    } else if (e.key == "ArrowDown") {
      setPrevMessageIndex((prev) => Math.max(-1, prev - 1));
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <MessageThreadTopBar user={user} />
      <div className="flex flex-col flex-1 w-full min-h-0 pb-4">
        {messages.length > 0 && !error && !messagesLoading ? (
          <MessageListView messageGroups={messageGroups} />
        ) : !error && !messagesLoading ? (
          <div className="flex flex-col items-center justify-center flex-1 text-muted">
            <ChatCenteredText weight="bold" size={132} />
            <div className="text-xl font-bold">Send a message</div>
          </div>
        ) : error && !messagesLoading ? (
          <div className="flex flex-col items-center justify-center flex-1 text-muted">
            <CircleWavyWarning size={132} weight="bold" />
            <div className="text-xl font-semibold">Something went wrong!</div>
          </div>
        ) : (
          messagesLoading && (
            <div className="flex items-center justify-center flex-1">
              <Spinner />
            </div>
          )
        )}
        <div className="px-4">
          <Formik
            initialValues={{ messageBody: "" }}
            innerRef={formRef}
            onSubmit={async ({ messageBody }, form) => {
              messageBody = messageBody.trim();
              if (!messageBody && prevMessageIndex < 0) return;
              if (!currentUser) return;

              if (prevMessageIndex >= 0) {
                messageBody = prevMessages[prevMessageIndex];
              }

              const messageDTO: MessageDTO = {
                body: messageBody,
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

              setPrevMessages((prev) => [messageBody, ...prev]);
              setPrevMessageIndex(-1);
              setInputValue("");
              form.resetForm();
            }}
          >
            <Form className="flex items-center">
              <Field
                as="input"
                type="text"
                name="messageBody"
                innerRef={inputRef}
                autoComplete="off"
                disabled={error}
                placeholder="Send a message"
                onKeyDown={onKeyDownHandler}
                value={prevMessageIndex > -1 ? prevMessages[prevMessageIndex] : inputValue}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                className="w-full p-2.5 px-4 transition-shadow rounded-lg shadow-md focus:ring-2 focus:outline-none ring-brand-500 bg-dark-600 bg-opacity-30 hover:bg-opacity-20"
              />
              <MediaInput socket={socket} thread={thread} />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
