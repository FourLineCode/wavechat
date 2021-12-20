import {
	AuthorizeSocketDTO,
	ErrorSocketEvents,
	MessageSocketEvents,
	SocketEvents,
} from "@wavechat/shared";
import cookie from "cookie";
import { Server as IOServer, Socket } from "socket.io";
import { graphQLClient } from "src/graphql/client";
import {
	AUTHORIZE_SOCKET,
	IsSocketAuthorizedQuery,
	IsSocketAuthorizedVariables,
} from "src/graphql/queries";
import { store } from "src/redis/store";

export async function initializeSocketHandler(io: IOServer) {
	io.on(SocketEvents.Connect, onConnect);
}

async function onConnect(socket: Socket) {
	console.log("+ User has connected -", socket.id);
	const { authorized, user } = await authorizeSocket(socket);
	if (!authorized) {
		socket.emit(
			ErrorSocketEvents.AuthorizationError,
			"You are not signed in, or your session has expired"
		);
		socket.disconnect();
		return;
	}

	// Store user info in redis store and send user:connected signal
	await store.set(socket.id, JSON.stringify(user));
	socket.emit(MessageSocketEvents.Connected);

	socket.on(SocketEvents.Disconnect, () => onDisconnect(socket));
}

async function onDisconnect(socket: Socket) {
	// Remove auth info from redis store
	await store.del(socket.id);
	console.log("- User has disconnected -", socket.id);
}

async function authorizeSocket(socket: Socket): Promise<AuthorizeSocketDTO> {
	try {
		const cookies = cookie.parse(socket.request.headers.cookie || "");
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
		return { authorized: false, user: null };
	}
}
