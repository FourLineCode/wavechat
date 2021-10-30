import { SocketEvents } from '@shared/socket/events';
import cookie from 'cookie';
import { Server, Socket } from 'socket.io';
import { graphQLClient } from 'src/graphql/client';
import {
	AUTHORIZE_SOCKET,
	IsSocketAuthorizedQuery,
	IsSocketAuthorizedVariables,
} from 'src/graphql/queries';
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
		const authorized = await this.authorizeConnection(socket);

		if (!authorized) {
			socket.disconnect();
			console.log('disconnecting - not authorized');
			return;
		}

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

	private async authorizeConnection(socket: Socket): Promise<boolean> {
		try {
			const cookies = cookie.parse(socket.request.headers.cookie || '');
			const data = await graphQLClient.request<
				IsSocketAuthorizedQuery,
				IsSocketAuthorizedVariables
			>(AUTHORIZE_SOCKET, {
				sessionId: cookies.session,
			});

			return data.isSocketAuthorized;
		} catch (error) {
			if (config.isDev) {
				console.log(error);
			}
			return false;
		}
	}
}
