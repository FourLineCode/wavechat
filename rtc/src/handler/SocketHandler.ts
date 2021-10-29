import { SocketEvents } from '@shared/socket/events';
import { Server, Socket } from 'socket.io';
import { UserEventHandler } from 'src/handler/UserEventHandler';
import { config } from 'src/internal/config';

export class SocketHandler {
	private io: Server;
	private userHandler: UserEventHandler;

	public constructor(io: Server) {
		this.io = io;
		this.userHandler = new UserEventHandler(this.io);
	}

	public async initialize() {
		this.io.on(SocketEvents.Connect, (socket: Socket) => this.onConnect(socket));

		this.userHandler.initialize();
	}

	private async onConnect(socket: Socket) {
		if (config.isDev) {
			console.log('+ Socket client has connected:', socket.id);
		}

		socket.on(SocketEvents.Disconnect, () => this.onDisconnect(socket));
	}

	private async onDisconnect(socket: Socket) {
		if (config.isDev) {
			console.log('- Socket client has disconnected:', socket.id);
		}
	}
}
