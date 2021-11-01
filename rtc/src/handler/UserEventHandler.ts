import { UserPubsubChannels } from '@shared/pubsub/channels';
import { ErrorSocketEvents, SocketEvents, UserSocketEvents } from '@shared/socket/events';
import { UserDTO } from '@shared/types/auth';
import { MessageDTO, RoomEventDTO } from '@shared/types/message';
import { Server, Socket } from 'socket.io';
import { graphQLClient } from 'src/graphql/client';
import {
	AUTHORIZE_JOIN_ROOM,
	IsUserInThreadQuery,
	IsUserInThreadVariables,
	PersistMessageQuery,
	PersistMessageVariables,
	PERSIST_MESSAGE,
} from 'src/graphql/queries';
import { config } from 'src/internal/config';
import { PubsubClient } from 'src/redis/PubsubClient';
import { store } from 'src/redis/store';
import { v4 as uuid } from 'uuid';

export class UserEventHandler {
	private io: Server;
	private pubsub: PubsubClient;

	public constructor(io: Server) {
		this.io = io;
		this.pubsub = new PubsubClient();
	}

	public async initialize() {
		this.startPubsubListener();

		this.io.on(SocketEvents.Connect, async (socket: Socket) => {
			socket.on(UserSocketEvents.JoinRoom, ({ roomId }: RoomEventDTO) => {
				this.joinRoom({ socket, roomId });
			});

			socket.on(UserSocketEvents.SendMessage, (message: MessageDTO) =>
				this.publishMessage(message)
			);

			socket.on(UserSocketEvents.LeaveRoom, ({ roomId }: RoomEventDTO) => {
				this.leaveRoom({ socket, roomId });
			});

			socket.on(SocketEvents.Disconnect, () => {
				socket.removeAllListeners();
			});
		});
	}

	private async startPubsubListener() {
		await this.pubsub.subscriber.subscribe(UserPubsubChannels.Message);

		this.pubsub.subscriber.on('message', (_channel: string, message: string) => {
			const messageDTO: MessageDTO = JSON.parse(message);
			messageDTO.id = uuid();
			const currentTime = new Date().toISOString();
			messageDTO.createdAt = currentTime;
			messageDTO.updatedAt = currentTime;

			this.io.to(messageDTO.threadId).emit(UserSocketEvents.RecieveMessage, messageDTO);

			// Persist message in api service database
			// NOTE: this grqphql request is not awaited intentionally
			// fire and forget request
			graphQLClient.request<PersistMessageQuery, PersistMessageVariables>(PERSIST_MESSAGE, {
				messageDTO: messageDTO,
			});
		});
	}

	private async publishMessage(message: MessageDTO) {
		await this.pubsub.publisher.publish(UserPubsubChannels.Message, JSON.stringify(message));
	}

	private async joinRoom({ socket, roomId }: { socket: Socket; roomId: string }) {
		const authorized = await this.authorizeJoinRoom({ socket, roomId });
		if (!authorized) {
			socket.emit(ErrorSocketEvents.JoinRoomError, 'You are not part of this conversation');
			return;
		}

		socket.join(roomId);
	}

	private async leaveRoom({ socket, roomId }: { socket: Socket; roomId: string }) {
		await socket.leave(roomId);
	}

	private async authorizeJoinRoom({
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
			if (config.isDev) {
				console.log(error);
			}

			return false;
		}
	}
}
