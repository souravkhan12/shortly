import fp from "fastify-plugin";
import { registerRoutes } from "../routes/index.js";
import type { FastifyInstance } from "fastify";

export default fp(async (app: FastifyInstance) => {
  app.register(registerRoutes);
});
