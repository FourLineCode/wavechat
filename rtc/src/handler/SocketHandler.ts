import { UserPubsubChannels } from '@shared/pubsub/channels';
import { UserSocketEvents } from '@shared/socket/events';
import { MessageDTO } from '@shared/types/message';
import os from 'os';
import { Server, Socket } from 'socket.io';
import { pubsub } from 'src/pubsub/clients';

export class SocketHandler {
	private io: Server;

	public constructor(io: Server) {
		this.io = io;
	}

	public async initialize() {
		this.io.on('connection', async (socket) => {
			console.log('+ Socket client has connected:', socket.id);

			this.handleUserEvents(socket);

			socket.on('disconnect', () => {
				console.log('- Socket client has disconnected:', socket.id);
			});
		});

		pubsub.user.subscribe(UserPubsubChannels.Message);
		pubsub.user.subscriber.on('message', (_channel, message) => {
			// console.log(message);
			this.io.emit(UserSocketEvents.RecieveMessage, message);
		});
	}

	private async handleUserEvents(socket: Socket) {
		socket.on(UserSocketEvents.Tick, async () => {
			socket.emit(UserSocketEvents.RecieveMessage, `You are on server - ${os.hostname()}`);
		});

		socket.on(UserSocketEvents.SendMessage, (message: MessageDTO) => {
			pubsub.user.publishMessage(message);
		});
	}
}
