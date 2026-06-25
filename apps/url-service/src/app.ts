import Fastify from "fastify";
import { registerRoutes } from "./routes/index.js";

export const app = Fastify({
  logger: true,
});

app.register(registerRoutes);
