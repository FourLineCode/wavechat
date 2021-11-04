import { GraphQLClient } from 'graphql-request';
import { generateInternalToken } from 'src/graphql/token';
import { config } from 'src/internal/config';

let hostname = config.isDev ? 'api:5000' : 'wcp-api:5000';
const endpoint = `http://${hostname}/graphql`;

const internalToken = generateInternalToken();

export const graphQLClient = new GraphQLClient(endpoint, {
	headers: {
		'internal-token': internalToken,
	},
});
