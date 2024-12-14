import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  integer,
  jsonb
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/users";
import { links } from "@/db/schema/links";
import { collections } from "@/db/schema/collections";

// Report types and status
export const reportTypes = {
  USER: 'user',
  LINK: 'link',
  COLLECTION: 'collection',
  STASH: 'stash',
  COMMENT: 'comment'
} as const;

export const reportStatus = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  REVIEWED: 'reviewed',
  ACTION_TAKEN: 'action_taken',
  DISMISSED: 'dismissed'
} as const;

// Rename from moderationActions to moderationActionTypes
export const moderationActionTypes = {
  BLOCK: 'block',
  DELETE: 'delete',
  WARN: 'warn',
  ARCHIVE: 'archive',
  SUSPEND: 'suspend',
  RESTORE: 'restore'
} as const;

// Reports table
export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportingUserId: uuid("reporting_user_id").references(() => users.id).notNull(),
  reportedEntityId: uuid("reported_entity_id").notNull(),
  entityType: varchar("entity_type", { length: 20 }).notNull(),
  reason: varchar("reason", { length: 100 }).notNull(),
  details: text("details"),
  status: varchar("status", { length: 20 }).default('pending').notNull(),
  priority: integer("priority").default(0),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  reviewNotes: text("review_notes"),
  reviewedAt: timestamp("reviewed_at"),
  actionTaken: varchar("action_taken", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Moderation actions table
export const moderationActions = pgTable("moderation_actions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  contentId: uuid("content_id"),
  actionType: varchar("action_type", { length: 20 }).notNull(),
  actionReason: text("action_reason").notNull(),
  moderatorId: uuid("moderator_id").references(() => users.id).notNull(),
  metadata: jsonb("metadata").default({}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Archived content
export const archivedContent = pgTable("archived_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  contentId: uuid("content_id").notNull(),
  contentType: varchar("content_type", { length: 20 }).notNull(),
  isArchived: boolean("is_archived").default(true).notNull(),
  archivedBy: uuid("archived_by").references(() => users.id).notNull(),
  archivedAt: timestamp("archived_at").defaultNow().notNull(),
  metadata: jsonb("metadata").default({}).notNull(),
  expiresAt: timestamp("expires_at")
});

// Spam detection
export const spamDetection = pgTable("spam_detection", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  contentId: uuid("content_id"),
  contentType: varchar("content_type", { length: 20 }).notNull(),
  detectedViolation: varchar("detected_violation", { length: 100 }).notNull(),
  violationScore: integer("violation_score").notNull(),
  confidence: integer("confidence").default(0),
  actionTaken: varchar("action_taken", { length: 20 }),
  isAutoResolved: boolean("is_auto_resolved").default(false),
  metadata: jsonb("metadata").default({}).notNull(),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at")
});

// New table for tracking user violations
export const userViolations = pgTable("user_violations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  violationType: varchar("violation_type", { length: 50 }).notNull(),
  severity: integer("severity").notNull(),
  description: text("description"),
  actionTaken: varchar("action_taken", { length: 20 }),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.id).notNull()
});

// Types
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
export type ModerationAction = typeof moderationActions.$inferSelect;
export type NewModerationAction = typeof moderationActions.$inferInsert;
export type ArchivedContent = typeof archivedContent.$inferSelect;
export type NewArchivedContent = typeof archivedContent.$inferInsert;
export type SpamDetection = typeof spamDetection.$inferSelect;
export type NewSpamDetection = typeof spamDetection.$inferInsert;
export type UserViolation = typeof userViolations.$inferSelect;
export type NewUserViolation = typeof userViolations.$inferInsert; 