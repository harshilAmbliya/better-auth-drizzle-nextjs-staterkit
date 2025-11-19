import { relations } from "drizzle-orm";
import { tags } from "../tables/tags";
import { postsTags } from "../mappings/postsTags";

/**
 * Tags relations
 * Defines many-to-many relationship for tags
 */
export const tagsRelations = relations(tags, ({ many }) => ({
  // Many-to-many: Tag has many posts through postsTags
  posts: many(postsTags),
}));

