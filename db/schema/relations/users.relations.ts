import { relations } from "drizzle-orm";
import { user } from "../auth-schema";
import { profiles } from "../tables/profiles";
import { posts } from "../tables/posts";
import { comments } from "../tables/comments";
import { roles } from "../tables/roles";

/**
 * User relations (from auth-schema)
 * Defines one-to-many and many-to-one relationships for authenticated users
 * Note: This extends the Better Auth user table with application-specific relations
 */
export const userRelations = relations(user, ({ one, many }) => ({
  // One-to-one: User has one profile
  profile: one(profiles, {
    fields: [user.id],
    references: [profiles.userId],
  }),

  // Many-to-one: User has one role (user, admin, super_admin, etc.)
  role: one(roles, {
    fields: [user.roleId],
    references: [roles.id],
  }),

  // One-to-many: User has many posts
  posts: many(posts),

  // One-to-many: User has many comments
  comments: many(comments),
}));

