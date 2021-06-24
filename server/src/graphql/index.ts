import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { app } from '../app';
import { schema } from '../graphql/schema';
import { config } from '../internal/config';

export const startServer = () => {
	const apolloserver = new ApolloServer({
		schema,
		playground: config.isDev && {
			settings: {
				'request.credentials': 'include',
			},
		},
		tracing: config.isDev,
		context: {},
	});

	apolloserver.applyMiddleware({ app, path: '/graphql' });

	const server = createServer(app);

	server.listen({ port: config.port }, () => {
		console.log(`\nServer is now running on http://localhost:${config.port}/graphql\n`);
	});
};
