import { ApolloClient, InMemoryCache } from '@apollo/client';

/* Generates a ApolloClient instance used both server and client side */
/* Dynamic hostname based on process.browser property (only for developent docker environment) */

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
