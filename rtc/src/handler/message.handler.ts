import { UserPubsubChannels } from '@shared/pubsub/channels';
import { ErrorSocketEvents, MessageSocketEvents, SocketEvents } from '@shared/socket/events';
import { UserDTO } from '@shared/types/auth';
import { MessageDTO, RoomEventDTO } from '@shared/types/message';
import { Server as IOServer, Socket } from 'socket.io';
import { graphQLClient } from 'src/graphql/client';
import {
	AUTHORIZE_JOIN_ROOM,
	IsUserInThreadQuery,
	IsUserInThreadVariables,
	PersistMessageQuery,
	PersistMessageVariables,
	PERSIST_MESSAGE,
} from 'src/graphql/queries';
import { pubsub } from 'src/redis/pubsub';
import { store } from 'src/redis/store';
import { v4 as uuid } from 'uuid';

export async function initializeMessageHandler(io: IOServer) {
	await pubsub.subscriber.subscribe(UserPubsubChannels.Message);
	pubsub.subscriber.on('message', (_channel: string, message: string) => {
		const messageDTO: MessageDTO = JSON.parse(message);
		broadcastMessage(io, messageDTO);
	});

	io.on(SocketEvents.Connect, async (socket: Socket) => {
		socket.on(MessageSocketEvents.JoinRoom, ({ roomId }: RoomEventDTO) => {
			joinRoom({ socket, roomId });
		});

		socket.on(MessageSocketEvents.SendMessage, (message: MessageDTO) =>
			publishMessage(message)
		);

		socket.on(MessageSocketEvents.LeaveRoom, ({ roomId }: RoomEventDTO) => {
			leaveRoom({ socket, roomId });
		});

		socket.on(SocketEvents.Disconnect, () => {
			socket.removeAllListeners();
		});
	});
}

async function publishMessage(message: MessageDTO) {
	message.id = uuid();
	const currentTime = new Date().toISOString();
	message.createdAt = currentTime;
	message.updatedAt = currentTime;

	await pubsub.publisher.publish(UserPubsubChannels.Message, JSON.stringify(message));

	// Persist message in api service database
	// NOTE: this grqphql request is not awaited intentionally
	// fire and forget request
	graphQLClient.request<PersistMessageQuery, PersistMessageVariables>(PERSIST_MESSAGE, {
		messageDTO: message,
	});
}

async function broadcastMessage(io: IOServer, message: MessageDTO) {
	io.to(message.threadId).emit(MessageSocketEvents.RecieveMessage, message);
}

async function joinRoom({ socket, roomId }: { socket: Socket; roomId: string }) {
	const authorized = await authorizeJoinRoom({ socket, roomId });
	if (!authorized) {
		socket.emit(ErrorSocketEvents.JoinRoomError, 'You are not part of this conversation');
		return;
	}

	socket.join(roomId);
}

async function leaveRoom({ socket, roomId }: { socket: Socket; roomId: string }) {
	await socket.leave(roomId);
}

async function authorizeJoinRoom({
	socket,
	roomId,
}: {
	socket: Socket;
	roomId: string;
}): Promise<boolean> {
	try {
		const userObjectString = await store.get(socket.id);
		if (!userObjectString) {
			return false;
		}

		const user: UserDTO = JSON.parse(userObjectString);
		const data = await graphQLClient.request<IsUserInThreadQuery, IsUserInThreadVariables>(
			AUTHORIZE_JOIN_ROOM,
			{
				threadId: roomId,
				userId: user.id,
			}
		);

		return data.isUserInThread;
	} catch (error) {
		return false;
	}
}
