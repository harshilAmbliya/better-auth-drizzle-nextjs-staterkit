import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

/**
 * Posts table
 * Stores blog posts, articles, or any content created by users
 */
export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  slug: text("slug").notNull().unique(),
  published: boolean("published").default(false).notNull(),
  authorId: text("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

