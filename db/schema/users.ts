import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Better Auth generates text IDs, not UUIDs
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(), // Boolean - true when user verifies email
  name: text("name").notNull(),
  password: text("password"),
  image: text("image"),
  isActive: boolean("is_active").default(true).notNull(),
  // Make these nullable so Better Auth doesn't try to set them - DB defaults handle them
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
