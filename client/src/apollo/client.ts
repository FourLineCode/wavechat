import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	ssrMode: typeof window === undefined,
	credentials: 'include',
	cache: new InMemoryCache(),
});

export const serverSidedClient = new ApolloClient({
	uri: 'http://server:5000/graphql',
	ssrMode: typeof window === undefined,
	credentials: 'include',
	cache: new InMemoryCache(),
});
