import type { FastifyInstance } from "fastify";

import { createUrlSchema } from "./url.schema.js";
import { buildUrlModule } from "./url.module.js";

export async function registerUrlRoutes(app: FastifyInstance) {
  const controller = buildUrlModule().controller;
  app.post(
    "/urls",
    {
      schema: createUrlSchema,
    },
    controller.create.bind(controller),
  );
}
