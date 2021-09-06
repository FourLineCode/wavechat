import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import socketio from 'socket.io';
import { app } from 'src/app';
import { createContext } from 'src/graphql/context';
import { schema } from 'src/graphql/schema';
import { config } from 'src/internal/config';
import { SockerHandler } from 'src/socket';

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
