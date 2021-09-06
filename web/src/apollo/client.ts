import { ApolloClient, InMemoryCache } from '@apollo/client';

let hostname = 'localhost';

if (!process.browser) {
	hostname = 'api';
}

export const client = new ApolloClient({
	uri: `http://${hostname}:5000/graphql`,
	ssrMode: typeof window === undefined,
	credentials: 'include',
	cache: new InMemoryCache(),
});
