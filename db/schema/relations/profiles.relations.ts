import { relations } from "drizzle-orm";
import { profiles } from "../tables/profiles";
import { user } from "../auth-schema";

/**
 * Profiles relations
 * Defines one-to-one relationship for profiles
 */
export const profilesRelations = relations(profiles, ({ one }) => ({
  // One-to-one: Profile belongs to one user (from auth-schema)
  user: one(user, {
    fields: [profiles.userId],
    references: [user.id],
  }),
}));

