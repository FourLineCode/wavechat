import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { app } from 'src/app';
import { createContext } from 'src/graphql/context';
import { schema } from 'src/graphql/schema';
import { config } from 'src/internal/config';

export async function startServer() {
	//Create ApolloServer instance with caching and authorized context
	const apolloServer = new ApolloServer({
		schema,
		context: createContext,
		plugins: [
			config.isDev
				? ApolloServerPluginLandingPageGraphQLPlayground({
						settings: {
							'request.credentials': 'include',
						},
				  })
				: ApolloServerPluginLandingPageProductionDefault(),
		],
	});

	// Start ApolloServer instance - (new in apollo-server v3)
	await apolloServer.start();

	// Apply Express as middleware with cors disabled (cors handled by express)
	apolloServer.applyMiddleware({ app, path: '/graphql', cors: false });

	// Create the http server instance
	const server = createServer(app);

	// Start the server
	server.listen({ port: config.port }, () => {
		console.log(`\nApi Server is now running on http://localhost:${config.port}\n`);
	});
}
