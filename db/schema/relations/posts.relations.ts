import { relations } from "drizzle-orm";
import { posts } from "../tables/posts";
import { user } from "../auth-schema";
import { comments } from "../tables/comments";
import { postsTags } from "../mappings/postsTags";
import { tags } from "../tables/tags";

/**
 * Posts relations
 * Defines one-to-many and many-to-many relationships for posts
 */
export const postsRelations = relations(posts, ({ one, many }) => ({
  // Many-to-one: Post belongs to one author (user from auth-schema)
  author: one(user, {
    fields: [posts.authorId],
    references: [user.id],
  }),

  // One-to-many: Post has many comments
  comments: many(comments),

  // Many-to-many: Post has many tags through postsTags
  tags: many(postsTags),
}));

