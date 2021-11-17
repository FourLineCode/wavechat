import { Server as IOServer } from 'socket.io';
import { initializeMessageHandler } from 'src/handler/message.handler';
import { initializeSocketHandler } from 'src/handler/socket.handler';

export async function initializeHandlers(io: IOServer) {
	await initializeSocketHandler(io);
	await initializeMessageHandler(io);
}
