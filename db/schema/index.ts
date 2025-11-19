// Export all schemas from this file
// This allows you to organize schemas in separate files and import them here

// Better Auth required tables (keep at root for compatibility)
// Note: Auth tables (user, session, account, verification) are separate from application tables
export * from "./auth-schema";

// Main application tables
export * from "./tables/posts";
export * from "./tables/comments";
export * from "./tables/profiles";
export * from "./tables/tags";
export * from "./tables/roles";

// Many-to-many mapping tables
export * from "./mappings/postsTags";
// Note: usersRoles mapping removed - users now have a direct roleId field (one role per user)

// Relations (must be exported for Drizzle to recognize them)
// Note: userRelations extends the auth user table with application-specific relations
export * from "./relations/users.relations";
export * from "./relations/posts.relations";
export * from "./relations/comments.relations";
export * from "./relations/profiles.relations";
export * from "./relations/tags.relations";
export * from "./relations/roles.relations";
export * from "./relations/mappings.relations";
