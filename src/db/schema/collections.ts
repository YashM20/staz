import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  jsonb,
  integer
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";
import { bookmarks } from "@/db/schema/bookmarks";
import { relations } from "drizzle-orm";

// Visibility types for collections
export const visibilityTypes = {
  PRIVATE: 'private',
  PUBLIC: 'public',
  COOPERATIVE: 'cooperative'
} as const;

export type VisibilityType = typeof visibilityTypes[keyof typeof visibilityTypes];

// Access levels for collection sharing
export const accessLevels = {
  VIEW: 'view',
  EDIT: 'edit',
  ADMIN: 'admin'
} as const;

export type AccessLevel = typeof accessLevels[keyof typeof accessLevels];

// Tables
export const userStash = pgTable("user_stash", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  customSlug: varchar("custom_slug", { length: 100 }),
  isPublic: boolean("is_public").default(false),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  settings: jsonb("settings").default({}).notNull(),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const collections = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  username: varchar("username", { length: 50 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  customSlug: varchar("custom_slug", { length: 100 }),
  visibility: varchar("visibility", { length: 20 })
    .notNull()
    .default(visibilityTypes.PRIVATE),
  shareUrl: text("share_url").unique(),
  isPubliclyListed: boolean("is_publicly_listed").default(false),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  starCount: integer("star_count").default(0),
  viewCount: integer("view_count").default(0),
  settings: jsonb("settings").default({}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const collectionBookmarks = pgTable("collection_bookmarks", {
  collectionId: uuid("collection_id").references(() => collections.id).notNull(),
  bookmarkId: uuid("bookmark_id").references(() => bookmarks.id).notNull(),
  order: integer("order").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull()
});

export const collectionAccess = pgTable("collection_access", {
  id: uuid("id").defaultRandom().primaryKey(),
  collectionId: uuid("collection_id").references(() => collections.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  accessLevel: varchar("access_level", { length: 20 }).notNull(),
  grantedAt: timestamp("granted_at").defaultNow().notNull(),
  grantedBy: uuid("granted_by").references(() => users.id).notNull()
});

// Relations
export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users, {
    fields: [collections.userId],
    references: [users.id],
  }),
  bookmarks: many(collectionBookmarks),
  access: many(collectionAccess)
}));

// Types
export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
export type UserStash = typeof userStash.$inferSelect;
export type NewUserStash = typeof userStash.$inferInsert;
export type CollectionAccess = typeof collectionAccess.$inferSelect;
export type NewCollectionAccess = typeof collectionAccess.$inferInsert;
export type CollectionBookmark = typeof collectionBookmarks.$inferSelect;
export type NewCollectionBookmark = typeof collectionBookmarks.$inferInsert;