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
	//Create ApolloServer instance with caching and authorized context
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

	// Start ApolloServer instance - (new in apollo-server v3)
	await apolloServer.start();

	// Apply Express as middleware with cors disabled (cors handled by express)
	apolloServer.applyMiddleware({ app, path: '/graphql', cors: false });

	// Create the http server instance
	const server = createServer(app);

	// Apply WebSocket upgrader to the http server
	const io = new socketio.Server(server, {
		path: '/ws',
		cors: {
			origin: 'http://localhost:3000',
			credentials: true,
		},
	});

	// Apply WebSocket event handler
	io.on('connection', SockerHandler.onConnection);

	// Start the server
	server.listen({ port: config.port }, () => {
		console.log(`\nServer is now running on http://localhost:${config.port}\n`);
	});
}
