import { Server as IOServer } from 'socket.io';
import { initializeMessageHandler } from 'src/handler/message.handler';
import { initializeSocketHandler } from 'src/handler/socket.handler';
import { Config } from 'src/internal/config';

export async function initializeHandlers(io: IOServer, config: Config) {
	await initializeSocketHandler(io);
	await initializeMessageHandler(io);
}
