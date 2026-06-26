import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import type { FastifyInstance } from "fastify";

import { envSchema } from "../config/env.schema.js";

export default fp(async (app: FastifyInstance) => {
  await app.register(fastifyEnv, {
    confKey: "config",
    schema: envSchema,
    dotenv: true,
  });
});
