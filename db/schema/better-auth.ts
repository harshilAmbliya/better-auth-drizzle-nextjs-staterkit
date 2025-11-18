/**
 * Better Auth Required Tables
 * 
 * These tables are required by Better Auth for authentication to work properly.
 * Better Auth uses these tables to manage sessions, accounts, and verifications.
 */

import { pgTable, text, timestamp, uuid, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

// Session table - stores user sessions
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id") // Changed to text to match users.id
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Account table - stores OAuth accounts and linked accounts
export const account = pgTable("account", {
  id: text("id").primaryKey(), // Better Auth generates text IDs, not UUIDs
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id") // Changed to text to match users.id
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  expiresAt: timestamp("expires_at"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Verification table - stores email verification tokens
export const verification = pgTable("verification", {
  id: text("id").primaryKey(), // Better Auth generates text IDs, not UUIDs
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports
export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;
export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;
export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;

