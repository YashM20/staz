import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  jsonb,
  varchar,
  integer
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";
import { relations } from "drizzle-orm";
import { collectionBookmarks } from "@/db/schema/collections";

// Tables
export const domains = pgTable("domains", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 50 }),
  totalLinks: integer("total_links").default(0).notNull(),
  isBlocked: boolean("is_blocked").default(false),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  metadata: jsonb("metadata").default({}).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull()
});

export const globalBookmarks = pgTable("global_bookmarks", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull().unique(),
  domainId: uuid("domain_id").references(() => domains.id).notNull(),
  title: text("title"),
  description: text("description"),
  coverImage: text("cover_image"),
  favicon: text("favicon"),
  contentType: varchar("content_type", { length: 50 }),
  isBroken: boolean("is_broken").default(false),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  lastChecked: timestamp("last_checked"),
  metadata: jsonb("metadata").default({}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").defaultRandom().primaryKey(),
  globalBookmarkId: uuid("global_bookmark_id").references(() => globalBookmarks.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  username: varchar("username", { length: 50 }).notNull(),
  title: text("title"),
  description: text("description"),
  coverImage: text("cover_image"),
  notes: text("notes"),
  tags: text("tags").array(),
  type: varchar("type", { length: 20 }).notNull().default('link'),
  highlights: text("highlights").array(),
  isFavorite: boolean("is_favorite").default(false),
  isArchived: boolean("is_archived").default(false),
  isPublic: boolean("is_public").default(false),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  customSlug: varchar("custom_slug", { length: 100 }),
  viewCount: integer("view_count").default(0),
  lastAccessed: timestamp("last_accessed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const bookmarkRelations = relations(bookmarks, ({ one, many }) => ({
  globalBookmark: one(globalBookmarks, {
    fields: [bookmarks.globalBookmarkId],
    references: [globalBookmarks.id],
  }),
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
  collections: many(collectionBookmarks)
}));

export const globalBookmarkRelations = relations(globalBookmarks, ({ one, many }) => ({
  domain: one(domains, {
    fields: [globalBookmarks.domainId],
    references: [domains.id],
  }),
  userBookmarks: many(bookmarks)
}));

// Types
export type Domain = typeof domains.$inferSelect;
export type NewDomain = typeof domains.$inferInsert;
export type GlobalBookmark = typeof globalBookmarks.$inferSelect;
export type NewGlobalBookmark = typeof globalBookmarks.$inferInsert;
export type Bookmark = typeof bookmarks.$inferSelect;
export type NewBookmark = typeof bookmarks.$inferInsert;