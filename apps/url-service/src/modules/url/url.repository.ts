import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

import { urls } from "../../database/index.js";
import type { CreateUrlDto } from "./url.dto.js";

export class UrlRepository {
  constructor(private readonly db: NodePgDatabase) {}

  async create(dto: CreateUrlDto) {
    try {
      const [url] = await this.db
        .insert(urls)
        .values({
          originalUrl: dto.originalUrl,
        })
        .returning();

      return url;
    } catch (err) {
      console.error("Error creating URL:", err);
      throw err;
    }
  }

  async updateShortCode(id: number, shortCode: string): Promise<void> {
    const [updated] = await this.db
      .update(urls)
      .set({
        shortCode,
        updatedAt: new Date(),
      })
      .where(eq(urls.id, id))
      .returning();
  }
  async findByShortCode() {}
  async findById(id: number) {
    const [url] = await this.db
      .select()
      .from(urls)
      .where(eq(urls.id, id))
      .limit(1);

    return url ?? null;
  }
}
