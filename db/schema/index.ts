// Export all schemas from this file
// This allows you to organize schemas in separate files and import them here

export * from "./users";
export * from "./posts";
export * from "./better-auth"; // Better Auth required tables

// Define relations after all tables are imported to avoid circular dependencies
import { relations } from "drizzle-orm";
import { users } from "./users";
import { posts } from "./posts";
import { session, account } from "./better-auth";

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts), // One user can have many posts
  sessions: many(session), // One user can have many sessions
  accounts: many(account), // One user can have many accounts (OAuth)
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(users, {
    fields: [session.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(users, {
    fields: [account.userId],
    references: [users.id],
  }),
}));
