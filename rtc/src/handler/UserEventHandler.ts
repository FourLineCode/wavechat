import { UserPubsubChannels } from '@shared/pubsub/channels';
import { SocketEvents, UserSocketEvents } from '@shared/socket/events';
import { MessageDTO, RoomEventDTO } from '@shared/types/message';
import { Server, Socket } from 'socket.io';
import { PubsubClient } from 'src/pubsub/PubsubClient';
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

	private startPubsubListener() {
		this.pubsub.subscriber.subscribe(UserPubsubChannels.Message);

		this.pubsub.subscriber.on('message', (_channel: string, message: string) => {
			const messageDTO: MessageDTO = JSON.parse(message);
			messageDTO.id = uuid();
			messageDTO.createdAt = new Date().toISOString();

			this.io.to(messageDTO.threadId).emit(UserSocketEvents.RecieveMessage, messageDTO);

			// TODO: persist message in db through api
		});
	}

	private publishMessage(message: MessageDTO) {
		this.pubsub.publisher.publish(UserPubsubChannels.Message, JSON.stringify(message));
	}

	private joinRoom({ socket, roomId }: { socket: Socket; roomId: string }) {
		// TODO: authorize user and check participation of thread
		socket.join(roomId);
	}

	private leaveRoom({ socket, roomId }: { socket: Socket; roomId: string }) {
		// TODO: remove all auth info of socket
		socket.leave(roomId);
	}
}
