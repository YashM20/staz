import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { links } from "@/db/schema/links";

// Tags table for standardized tags
export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Junction table for link tags
export const linkTags = pgTable("link_tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  linkId: uuid("link_id").references(() => links.id).notNull(),
  tagId: uuid("tag_id").references(() => tags.id).notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull()
});

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert; 