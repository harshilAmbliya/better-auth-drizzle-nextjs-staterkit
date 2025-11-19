import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Comments table
 * Stores comments on posts
 */
export const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  postId: text("post_id").notNull(),
  authorId: text("author_id").notNull(),
  parentId: text("parent_id"), // For nested/reply comments
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

