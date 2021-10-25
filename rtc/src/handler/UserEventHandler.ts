import { UserPubsubChannels } from '@shared/pubsub/channels';
import { UserSocketEvents } from '@shared/socket/events';
import { MessageDTO, RoomEventDTO } from '@shared/types/message';
import { Server, Socket } from 'socket.io';
import { SocketEventHandler } from 'src/handler/SocketEventHandler';
import { PubsubClient } from 'src/pubsub/PubsubClient';
import { v4 as uuid } from 'uuid';

export class UserEventHandler extends SocketEventHandler {
	private io: Server;
	private pubsub: PubsubClient;

	public constructor(io: Server) {
		super();

		this.io = io;
		this.pubsub = new PubsubClient();
	}

	public async initialize() {
		this.subscribeChannels();
		this.startListener();
	}

	public async handleSocketEvents(socket: Socket) {
		socket.on(UserSocketEvents.SendMessage, (message: MessageDTO) => {
			this.pubsub.publisher.publish(UserPubsubChannels.Message, JSON.stringify(message));
		});

		socket.on(UserSocketEvents.JoinRoom, ({ roomId }: RoomEventDTO) => {
			// TODO: authorize user and check participation of thread
			socket.join(roomId);
		});

		socket.on(UserSocketEvents.LeaveRoom, ({ roomId }: RoomEventDTO) => {
			socket.leave(roomId);
		});
	}

	protected subscribeChannels() {
		this.pubsub.subscriber.subscribe(UserPubsubChannels.Message);
	}

	protected startListener() {
		this.pubsub.subscriber.on('message', (_channel: string, message: string) => {
			const messageDTO: MessageDTO = JSON.parse(message);
			messageDTO.id = uuid();
			messageDTO.createdAt = new Date().toISOString();

			this.io.to(messageDTO.threadId).emit(UserSocketEvents.RecieveMessage, messageDTO);

			// TODO: persist message in db through api
		});
	}
}
