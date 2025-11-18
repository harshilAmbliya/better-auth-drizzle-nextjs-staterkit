import { pgTable, text, timestamp, uuid, foreignKey } from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    userId: text("user_id").notNull(), // Changed to text to match users.id
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Define foreign key relationship separately
    userForeignKey: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "posts_user_id_users_id_fk",
    }).onDelete("cascade"),
  })
);

// Type exports for TypeScript
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
