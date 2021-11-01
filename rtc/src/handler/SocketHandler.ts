import { ErrorSocketEvents, SocketEvents } from '@shared/socket/events';
import { AuthorizeSocketDTO } from '@shared/types/auth';
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
import { store } from 'src/redis/store';

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
		const { authorized, user } = await this.authorizeConnection(socket);
		if (!authorized) {
			socket.emit(
				ErrorSocketEvents.AuthorizationError,
				'You are not signed in, or your session has expired'
			);
			socket.disconnect();
			return;
		}

		if (config.isDev) {
			console.log('+ Socket client has connected:', socket.id);
		}

		// Store user info in redis store
		await store.set(socket.id, JSON.stringify(user));

		socket.on(SocketEvents.Disconnect, () => this.onDisconnect(socket));
	}

	private async onDisconnect(socket: Socket) {
		// Remove auth info from redis store
		store.del(socket.id);

		if (config.isDev) {
			console.log('- Socket client has disconnected:', socket.id);
		}
	}

	private async authorizeConnection(socket: Socket): Promise<AuthorizeSocketDTO> {
		try {
			const cookies = cookie.parse(socket.request.headers.cookie || '');
			const data = await graphQLClient.request<
				IsSocketAuthorizedQuery,
				IsSocketAuthorizedVariables
			>(AUTHORIZE_SOCKET, {
				sessionId: cookies.session,
			});

			return {
				authorized: data.isSocketAuthorized.authorized,
				user: data.isSocketAuthorized.user,
			};
		} catch (error) {
			if (config.isDev) {
				console.log(error);
			}
			return { authorized: false, user: null };
		}
	}
}
