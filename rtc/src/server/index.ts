import fastify, { FastifyInstance } from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyCors from 'fastify-cors';
import fastifyHelmet from 'fastify-helmet';
import fastifyIO from 'fastify-socket.io';
import { config } from 'src/internal/config';

export class FastifyServer {
	private instance: FastifyInstance;

	public constructor() {
		this.instance = fastify();
		this.registerMiddleware();
		this.registerRoutes();
	}

	public static async getInstance() {
		const server = new FastifyServer();
		await server.instance.ready();
		return server.instance;
	}

	private registerMiddleware() {
		this.instance.register(fastifyCors, { credentials: true, origin: config.origins });
		this.instance.register(fastifyHelmet, { contentSecurityPolicy: false });
		this.instance.register(fastifyCookie);
		this.instance.register(fastifyIO, {
			path: '/ws',
			logLevel: config.isDev ? 'debug' : 'fatal',
			cors: {
				origin: config.origins,
				credentials: true,
			},
		});
	}

	private registerRoutes() {
		this.instance.get('/ws', async () => {
			this.instance.io.emit('init');
		});
	}
}
