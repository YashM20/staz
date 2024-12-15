import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean
} from "drizzle-orm/pg-core";
import { bookmarks } from "@/db/schema/bookmarks";

// Tags table for standardized tags
export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Junction table for bookmark tags
export const bookmarkTags = pgTable("bookmark_tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookmarkId: uuid("bookmark_id").references(() => bookmarks.id).notNull(),
  tagId: uuid("tag_id").references(() => tags.id).notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull()
});

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
export type BookmarkTag = typeof bookmarkTags.$inferSelect;
export type NewBookmarkTag = typeof bookmarkTags.$inferInsert; 