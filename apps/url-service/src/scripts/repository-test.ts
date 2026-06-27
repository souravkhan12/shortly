import "dotenv/config";
import { db } from "../database/db.js";
import { UrlRepository } from "../modules/url/url.repository.js";

const repository = new UrlRepository(db);

const result = await repository.create({
  originalUrl: "https://www.google.com",
});

console.log(result);

process.exit(0);
