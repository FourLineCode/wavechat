import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { config } from "src/internal/config";

export const client = new ApolloClient({
	uri: config.apiEndpoint,
	ssrMode: typeof window === undefined,
	credentials: "include",
	cache: new InMemoryCache(),
	link: createUploadLink({ uri: config.apiEndpoint, credentials: "include" }),
});
