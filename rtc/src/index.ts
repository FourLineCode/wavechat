import { SocketHandler } from 'src/handler/SocketHandler';
import { config } from 'src/internal/config';
import { FastifyServer } from 'src/server';

async function main() {
	const server = await FastifyServer.getInstance();

	const socketHandler = new SocketHandler(server.io);
	socketHandler.initialize();

	server.listen(config.port, '0.0.0.0', () => {
		console.log(`\nRTC Server is now running on http://localhost:${config.port}\n`);
	});
}

main().catch(console.error);
