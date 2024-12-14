import { 
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  boolean,
  jsonb,
  integer,
  type AnyPgColumn
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { relations } from "drizzle-orm";
import { accounts, sessions } from "./auths";

// Define the role enum type
export const userRoles = {
  GUEST: 'guest',
  USER: 'user',
  ADMIN: 'admin'
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  username: varchar('username', { length: 50 })
    .notNull()
    .unique(),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text('image'),
  bio: text('bio').default(''),
  role: varchar('role', { length: 20 }).notNull().default(userRoles.USER),
  isActive: boolean('is_active').default(true).notNull(),
  preferences: jsonb('preferences').default({}).notNull(),
  otherData: jsonb('other_data').default({}).notNull(),
  lastLogin: timestamp('last_login'),

  // Moderation fields
  isBlocked: boolean('is_blocked').default(false).notNull(),
  blockedAt: timestamp('blocked_at'),
  blockedBy: uuid('blocked_by').references((): AnyPgColumn => users.id, { onDelete: 'set null' }),
  blockReason: text('block_reason'),
  trustScore: integer('trust_score').default(0).notNull(),
  warningCount: integer('warning_count').default(0).notNull(),
  lastWarningAt: timestamp('last_warning_at'),
  isSuspended: boolean('is_suspended').default(false).notNull(),
  suspendedUntil: timestamp('suspended_until'),
  suspendedBy: uuid('suspended_by').references((): AnyPgColumn => users.id, { onDelete: 'set null' }),
  suspensionReason: text('suspension_reason'),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ one, many }) => ({
  blockedByUser: one(users, {
    fields: [users.blockedBy] as [typeof users.blockedBy],
    references: [users.id] as [typeof users.id],
    relationName: 'user_blocked_by',
  }),
  suspendedByUser: one(users, {
    fields: [users.suspendedBy] as [typeof users.suspendedBy],
    references: [users.id] as [typeof users.id],
    relationName: 'user_suspended_by',
  }),
  accounts: many(accounts),
  sessions: many(sessions),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users); 