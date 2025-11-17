// Export all schemas from this file
// This allows you to organize schemas in separate files and import them here

export * from "./users";
export * from "./posts";

// Define relations after all tables are imported to avoid circular dependencies
import { relations } from "drizzle-orm";
import { users } from "./users";
import { posts } from "./posts";

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts), // One user can have many posts
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
