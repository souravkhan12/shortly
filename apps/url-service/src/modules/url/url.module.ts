import { db } from "../../database/db.js";
import { UrlController } from "./url.controller.js";
import { UrlRepository } from "./url.repository.js";
import { UrlService } from "./url.service.js";

export function buildUrlModule() {
  const repository = new UrlRepository(db);
  const service = new UrlService(repository);
  const controller = new UrlController(service);

  return { controller };
}
