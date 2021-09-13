import { ApolloClient, InMemoryCache } from '@apollo/client';

/* Generates a ApolloClient instance used both server and client side */
/* Dynamic hostname based on process.browser property (only for developent docker environment) */

let hostname = 'api.wavechat.localhost';

if (!process.browser) {
	hostname = 'api:5000';
}

export const client = new ApolloClient({
	uri: `http://${hostname}/graphql`,
	ssrMode: typeof window === undefined,
	credentials: 'include',
	cache: new InMemoryCache(),
});
