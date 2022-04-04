import { GraphQLClient } from "graphql-request";
import { generateInternalToken } from "src/graphql/token";
import { getConfig } from "src/internal/config";

const config = getConfig();

const internalToken = generateInternalToken();

export const graphQLClient = new GraphQLClient(config.apiEndpoint, {
  headers: {
    "internal-token": internalToken,
  },
});
