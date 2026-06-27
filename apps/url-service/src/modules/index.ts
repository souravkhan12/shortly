import type { FastifyInstance } from "fastify";

import { registerHealthRoutes } from "./health/index.js";
import { registerUrlRoutes } from "./url/url.routes.js";

export async function registerModules(app: FastifyInstance) {
  app.register(registerHealthRoutes);
  app.register(registerUrlRoutes, {
    prefix: "/api/v1",
  });
}
