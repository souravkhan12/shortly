import {
  bigint,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const urls = pgTable(
  "urls",
  {
    id: bigint("id", {
      mode: "number",
    })
      .generatedAlwaysAsIdentity()
      .primaryKey(),

    shortCode: varchar("short_code", {
      length: 10,
    })
      .notNull()
      .unique(),

    originalUrl: text("original_url").notNull(),

    clickCount: bigint("click_count", {
      mode: "number",
    })
      .default(0)
      .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at"),
  },
  (table) => [index("idx_urls_short_code").on(table.shortCode)],
);
