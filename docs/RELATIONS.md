# How Drizzle Relations Work

## 📍 Where Relations Are Defined

**File: `db/schema/index.ts`**

```typescript
// Relations are defined here
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
```

## 🔄 How They're Included

**File: `db/index.ts`**

```typescript
// Step 1: Import everything from schema (includes relations)
import * as schema from "./schema";

// Step 2: Pass schema to drizzle (relations are included automatically)
export const db = drizzle(client, { schema });
```

When you do `import * as schema from "./schema"`, it includes:
- ✅ Tables (users, posts)
- ✅ Relations (usersRelations, postsRelations)
- ✅ Types (User, Post, etc.)

## 🎯 How to Use Relations

### ✅ You DON'T Need to Import Relations Directly!

Relations are automatically available through `db.query.*`

```typescript
// ❌ WRONG - Don't do this
import { usersRelations, postsRelations } from "@/db/schema";

// ✅ CORRECT - Just use db.query.*
import { db } from "@/db";

// Relations work automatically!
const postsWithUsers = await db.query.posts.findMany({
  with: {
    user: true, // This works because postsRelations is in the schema!
  },
});
```

## 📝 Complete Example

```typescript
// File: app/api/posts/route.ts
import { db, posts } from "@/db";
import { eq } from "drizzle-orm";

export async function GET() {
  // Use relations - no need to import them!
  const allPosts = await db.query.posts.findMany({
    with: {
      user: true, // Automatically includes user data
    },
  });

  return Response.json(allPosts);
}
```

## 🔍 The Flow

```
1. db/schema/index.ts
   └─> Defines & exports: usersRelations, postsRelations

2. db/index.ts
   └─> Imports: import * as schema from "./schema"
   └─> Passes to drizzle: drizzle(client, { schema })
   └─> Relations are now part of db instance

3. Your code (anywhere)
   └─> Import: import { db } from "@/db"
   └─> Use: db.query.posts.findMany({ with: { user: true } })
   └─> Relations work automatically! ✨
```

## 💡 Key Points

1. **Relations are exported** from `db/schema/index.ts`
2. **They're included** when you import the schema in `db/index.ts`
3. **They're passed** to drizzle via `{ schema }`
4. **You use them** via `db.query.*` - no direct import needed!
5. **They're type-safe** - TypeScript knows all the relations

## 🎓 Summary

**You don't import relations directly!**

They're automatically available because:
- They're exported from `db/schema/index.ts`
- The schema (with relations) is passed to `drizzle()` in `db/index.ts`
- `db.query.*` uses them automatically

Just use `db.query.*` and relations work! 🚀

