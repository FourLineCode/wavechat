import { Server, Socket } from 'socket.io';
import { UserEventHandler } from 'src/handler/UserEventHandler';

export class SocketHandler {
	private io: Server;
	private userHandler: UserEventHandler;

	public constructor(io: Server) {
		this.io = io;
		this.userHandler = new UserEventHandler(this.io);
	}

	public async initialize() {
		this.initializeHandlers();
		this.initializeEventListeners();
	}

	private initializeHandlers() {
		this.userHandler.initialize();
	}

	private initializeEventListeners() {
		this.io.on('connect', async (socket) => {
			console.log('+ Socket client has connected:', socket.id);

			this.assignSocketHandlers(socket);

			socket.on('disconnect', () => {
				console.log('- Socket client has disconnected:', socket.id);
			});
		});
	}

	private assignSocketHandlers(socket: Socket) {
		this.userHandler.handleSocketEvents(socket);
	}
}
