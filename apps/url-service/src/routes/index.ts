import type { FastifyInstance } from "fastify";
import { healthRoute } from "./health.js";

export async function registerRoutes(app: FastifyInstance) {
  app.register(healthRoute);
}
