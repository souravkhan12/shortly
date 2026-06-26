import type { FastifyInstance } from "fastify";
import envPlugin from "./env.js";
import loggerPlugin from "./logger.js";
import routesPlugin from "./routes.js";

export async function registerPlugins(app: FastifyInstance) {
  await app.register(envPlugin);

  await app.register(loggerPlugin);

  await app.register(routesPlugin);
}
