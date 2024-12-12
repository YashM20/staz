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
import { users } from "./users";
import { relations } from "drizzle-orm";

// Tables
const domains = pgTable("domains", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 50 }),
  totalLinks: integer("total_links").default(0).notNull(),
  isBlocked: boolean("is_blocked").default(false),
  metadata: jsonb("metadata").default({}).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull()
});

const globalLinks = pgTable("global_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull().unique(),
  domainId: uuid("domain_id").references(() => domains.id).notNull(),
  title: text("title"),
  description: text("description"),
  coverImage: text("cover_image"),
  favicon: text("favicon"),
  contentType: varchar("content_type", { length: 50 }),
  isBroken: boolean("is_broken").default(false),
  lastChecked: timestamp("last_checked"),
  metadata: jsonb("metadata").default({}).notNull(),
  multilingual: jsonb("multilingual").default({}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

const links = pgTable("links", {
  id: uuid("id").defaultRandom().primaryKey(),
  globalLinkId: uuid("global_link_id").references(() => globalLinks.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  username: varchar("username", { length: 50 }).notNull(),
  customTitle: text("custom_title"),
  customDescription: text("custom_description"),
  notes: text("notes"),
  isFavorite: boolean("is_favorite").default(false),
  isArchived: boolean("is_archived").default(false),
  isPublic: boolean("is_public").default(false),
  customSlug: varchar("custom_slug", { length: 100 }),
  viewCount: integer("view_count").default(0),
  lastAccessed: timestamp("last_accessed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Relations
export const linksRelations = relations(links, ({ one }) => ({
  globalLink: one(globalLinks, {
    fields: [links.globalLinkId],
    references: [globalLinks.id],
  }),
  user: one(users, {
    fields: [links.userId],
    references: [users.id],
  })
}));

// Types
export type Domain = typeof domains.$inferSelect;
export type NewDomain = typeof domains.$inferInsert;
export type GlobalLink = typeof globalLinks.$inferSelect;
export type NewGlobalLink = typeof globalLinks.$inferInsert;
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;

// Export tables
export {
  domains,
  globalLinks,
  links
}; 