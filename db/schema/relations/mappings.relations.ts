import { relations } from "drizzle-orm";
import { postsTags } from "../mappings/postsTags";
import { posts } from "../tables/posts";
import { tags } from "../tables/tags";

/**
 * Mapping tables relations
 * Defines relationships for many-to-many junction tables
 */

// Posts-Tags mapping relations
export const postsTagsRelations = relations(postsTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsTags.tagId],
    references: [tags.id],
  }),
}));

