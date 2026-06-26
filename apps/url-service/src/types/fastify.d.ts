import "fastify";
import { AppConfig } from "./env.js";

declare module "fastify" {
  interface FastifyInstance {
    config: AppConfig;
  }
}
