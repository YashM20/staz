import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  jsonb,
  boolean
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";

// Activity types
export const activityTypes = {
  LINK_ADDED: 'link_added',
  LINK_UPDATED: 'link_updated',
  LINK_DELETED: 'link_deleted',
  COLLECTION_CREATED: 'collection_created',
  COLLECTION_UPDATED: 'collection_updated',
  COLLECTION_DELETED: 'collection_deleted',
  ACCESS_GRANTED: 'access_granted',
  ACCESS_REVOKED: 'access_revoked'
} as const;

export type ActivityType = typeof activityTypes[keyof typeof activityTypes];

// Activity logging
export const activityLog = pgTable("activity_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  username: varchar("username", { length: 50 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  entityId: uuid("entity_id").notNull(),
  metadata: jsonb("metadata").default({}).notNull(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
}); 

// Types
export type ActivityLog = typeof activityLog.$inferSelect;
export type NewActivityLog = typeof activityLog.$inferInsert;

