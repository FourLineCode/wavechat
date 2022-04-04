import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { app } from "src/app";
import { createContext } from "src/graphql/context";
import { schema } from "src/graphql/schema";
import { Config } from "src/internal/config";

export async function startServer(config: Config) {
  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
    plugins: [
      config.isDev
        ? ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              "request.credentials": "include",
            },
          })
        : ApolloServerPluginLandingPageProductionDefault(),
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

  const server = createServer(app);

  server.listen({ port: config.port }, () => {
    console.log(`\nApi Server is now running on http://localhost:${config.port}\n`);
  });
}
