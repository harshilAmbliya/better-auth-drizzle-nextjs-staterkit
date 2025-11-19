import { relations } from "drizzle-orm";
import { comments } from "../tables/comments";
import { posts } from "../tables/posts";
import { user } from "../auth-schema";

/**
 * Comments relations
 * Defines one-to-many and many-to-one relationships for comments
 */
export const commentsRelations = relations(comments, ({ one, many }) => ({
	// Many-to-one: Comment belongs to one post
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),

	// Many-to-one: Comment belongs to one author (user from auth-schema)
	author: one(user, {
		fields: [comments.authorId],
		references: [user.id],
	}),

	// Many-to-one: Comment can have a parent comment (for nested comments)
	parent: one(comments, {
		fields: [comments.parentId],
		references: [comments.id],
		relationName: "commentReplies",
	}),

	// One-to-many: Comment can have many replies
	replies: many(comments, {
		relationName: "commentReplies",
	}),
}));

