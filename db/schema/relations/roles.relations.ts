import { relations } from "drizzle-orm";
import { roles } from "../tables/roles";
import { user } from "../auth-schema";

/**
 * Roles relations
 * Defines one-to-many relationship for roles
 */
export const rolesRelations = relations(roles, ({ many }) => ({
  // One-to-many: Role has many users (each user has one role)
  users: many(user),
}));

