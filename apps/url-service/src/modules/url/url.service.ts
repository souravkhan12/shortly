import { UrlRepository } from "./url.repository.js";
import type { CreateUrlDto } from "./url.dto.js";
import { Base62Encoder } from "../../utils/base62.js";

export class UrlService {
  constructor(private readonly repository: UrlRepository) {}

  async create(dto: CreateUrlDto) {
    // Step 1
    const url = await this.repository.create(dto);
    if (!url) {
      throw new Error("Failed to create URL.");
    }

    // Step 2
    const shortCode = Base62Encoder.encode(url.id);
    if (!shortCode) {
      throw new Error("Failed to generate short code.");
    }
    // Step 3
    await this.repository.updateShortCode(url.id, shortCode);
    // Step 4
    const updated = await this.repository.findById(url.id);
    if (!updated) {
      throw new Error("URL not found after creation.");
    }
    return updated;
  }
}
