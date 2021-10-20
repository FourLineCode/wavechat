import { something } from '@shared/types/data';
import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyCors from 'fastify-cors';
import fastifyHelmet from 'fastify-helmet';
import fastifyIO from 'fastify-socket.io';
import os from 'os';
import { config } from 'src/internal/config';

async function main() {
	const server = fastify();

	server.register(fastifyCors, { credentials: true, origin: config.origins });
	server.register(fastifyHelmet, { contentSecurityPolicy: false });
	server.register(fastifyCookie);
	server.register(fastifyIO, {
		path: '/ws',
		logLevel: config.isDev ? 'debug' : 'fatal',
		cors: {
			origin: config.origins,
			credentials: true,
		},
	});

	server.get('/ws', async () => {
		server.io.emit('init');
	});

	await server.ready();

	const hostname = os.hostname();
	server.io.on('connection', async (socket) => {
		console.log('Socket client has connected:', socket.id);
		socket.emit('msg', `Hello from server - ${hostname}`);

		socket.on('tick', () => {
			server.io.sockets
				.allSockets()
				.then((s) => s.size)
				.then((val) => {
					socket.emit('msg', `Number of clients ${val}`);
				});
		});
	});

	server.listen(config.port, '0.0.0.0', () => {
		console.log(`\nRTC Server is now running on http://localhost:${config.port}\n`);
	});
}

main().catch(console.error);

console.log(something);
