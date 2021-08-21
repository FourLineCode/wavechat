import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import socketio from 'socket.io';
import { app } from '../app';
import { schema } from '../graphql/schema';
import { config } from '../internal/config';
import { SockerHandler } from '../socket';
import { createContext } from './context';

export async function startServer() {
	const apolloServer = new ApolloServer({
		schema,
		context: createContext,
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground({
				settings: {
					'request.credentials': 'include',
				},
			}),
		],
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, path: '/graphql', cors: false });

	const server = createServer(app);

	const io = new socketio.Server(server, {
		path: '/ws',
		cors: {
			origin: 'http://localhost:3000',
			credentials: true,
		},
	});

	io.on('connection', SockerHandler.onConnection);

	server.listen({ port: config.port }, () => {
		console.log(`\nServer is now running on http://localhost:${config.port}\n`);
	});
}
