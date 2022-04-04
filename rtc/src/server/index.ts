import fastify, { FastifyInstance } from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifyCors from "fastify-cors";
import fastifyHelmet from "fastify-helmet";
import fastifyIO from "fastify-socket.io";
import { Config } from "src/internal/config";

export async function initializeServer(config: Config): Promise<FastifyInstance> {
  const server = fastify();

  registerMiddleware(server, config);
  registerRoutes(server);

  await server.ready();

  return server;
}

function registerMiddleware(server: FastifyInstance, config: Config) {
  server.register(fastifyCors, { credentials: true, origin: config.origins });
  server.register(fastifyHelmet, { contentSecurityPolicy: false });
  server.register(fastifyCookie);
  server.register(fastifyIO, {
    path: "/ws",
    logLevel: config.isDev ? "debug" : "fatal",
    cors: {
      origin: config.origins,
      credentials: true,
    },
  });
}

function registerRoutes(server: FastifyInstance) {
  server.get("/ws", async () => {
    server.io.emit("init");
  });
}
