import Fastify from "fastify";

import { registerPlugins } from "./plugins/index.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await registerPlugins(app);

  return app;
}
