import { UserPubsubChannels } from '@shared/pubsub/channels';
import { UserSocketEvents } from '@shared/socket/events';
import { MessageDTO } from '@shared/types/message';
import os from 'os';
import { Server, Socket } from 'socket.io';
import { SocketEventHandler } from 'src/handler/SocketEventHandler';
import { PubsubClient } from 'src/pubsub/PubsubClient';

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
		socket.on(UserSocketEvents.Tick, async () => {
			socket.emit(UserSocketEvents.RecieveMessage, `You are on server - ${os.hostname()}`);
		});

		socket.on(UserSocketEvents.SendMessage, (message: MessageDTO) => {
			this.pubsub.publisher.publish(UserPubsubChannels.Message, message);
		});
	}

	protected subscribeChannels() {
		this.pubsub.subscriber.subscribe(UserPubsubChannels.Message);
	}

	protected startListener() {
		this.pubsub.subscriber.on('message', (_channel, message) => {
			this.io.emit(UserSocketEvents.RecieveMessage, message);
		});
	}
}
