import type { FastifyInstance } from "fastify";

import { registerHealthRoutes } from "./health/index.js";

export async function registerModules(app: FastifyInstance) {
  app.register(registerHealthRoutes);
}
