import { pgTable, uuid, text, integer, boolean, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";
import { users } from "@/db/schema";

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => {
    return [{
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    }]
  }
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey().notNull(),
  userId: uuid("userId").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
},
  (verificationToken) => {
    return [{
      compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
    }];
  });

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => {
    return [{
      compositePK: primaryKey({ columns: [authenticator.userId, authenticator.credentialID] }),
    }]
  }
)

// Types
export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type Authenticator = typeof authenticators.$inferSelect;