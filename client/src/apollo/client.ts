import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	ssrMode: typeof window === undefined,
	cache: new InMemoryCache(),
});
