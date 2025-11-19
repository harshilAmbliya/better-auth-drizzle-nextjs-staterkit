import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { posts } from "../tables/posts";
import { tags } from "../tables/tags";

/**
 * Posts-Tags mapping table
 * Many-to-many relationship between posts and tags
 */
export const postsTags = pgTable(
  "posts_tags",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
  })
);

export type PostTag = typeof postsTags.$inferSelect;
export type NewPostTag = typeof postsTags.$inferInsert;

