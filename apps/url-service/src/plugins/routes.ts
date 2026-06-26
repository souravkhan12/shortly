import fp from "fastify-plugin";

import { registerModules } from "../modules/index.js";

export default fp(async (app) => {
  app.register(registerModules);
});
