# Better Auth Starter Kit

A production-ready Next.js starter template with Better Auth, Drizzle ORM, and Supabase PostgreSQL.

## 🚀 Features

- **Next.js 16** with App Router
- **Better Auth** - Modern authentication solution
- **Drizzle ORM** - Type-safe database queries
- **Supabase PostgreSQL** - Scalable database
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Environment Configuration** - Centralized env management
- **Error Handling** - Comprehensive error utilities
- **Database Migrations** - Version-controlled schema changes

## 📋 Prerequisites

- Node.js 20+ 
- pnpm (or npm/yarn)
- Supabase account and project

## 🛠️ Setup

### 1. Clone and Install

```bash
# Install dependencies
pnpm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `BETTER_AUTH_URL` - Your application base URL
- `BETTER_AUTH_SECRET` - Secret key (generate with: `openssl rand -base64 32`)

### 3. Database Setup

```bash
# Push schema to database
pnpm db:push

# Or use migrations (recommended for production)
pnpm db:generate  # Generate migration files
pnpm db:migrate   # Apply migrations

# Seed demo data (optional)
pnpm db:seed
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3005](http://localhost:3005)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── auth/          # Better Auth endpoints
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── config/                 # Configuration files
│   ├── env.ts             # Environment variables
│   └── index.ts           # App config
├── db/                     # Database
│   ├── index.ts           # Drizzle instance & utilities
│   └── schema/            # Database schemas
│       ├── index.ts
│       └── users.ts
├── lib/                    # Shared utilities
│   ├── middleware/        # Middleware helpers
│   │   └── auth.ts        # Auth middleware
│   └── utils/             # Utility functions
│       ├── api-response.ts
│       └── errors.ts
├── libs/                   # Library configurations
│   ├── auth.ts            # Better Auth server config
│   └── auth-client.ts     # Better Auth client config
├── scripts/                # Utility scripts
│   └── seed-users.ts      # Database seeding
└── drizzle/               # Migration files
    └── migrations/
```

## 🗄️ Database Commands

```bash
# Generate migration files from schema changes
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Push schema directly (dev only)
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio

# Seed database with demo data
pnpm db:seed
```

## 🔐 Authentication

### Server Components

```tsx
import { requireAuth, getSession } from '@/lib/middleware/auth';

// Require authentication
const session = await requireAuth();

// Get session (returns null if not authenticated)
const session = await getSession();
```

### Client Components

```tsx
'use client';
import { authClient } from '@/libs/auth-client';

const { data: session } = await authClient.getSession();
```

## 📝 API Routes

Use standardized response helpers:

```tsx
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const data = await fetchData();
    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
```

## 🎯 Best Practices

1. **Environment Variables**: Always use `config/env.ts` instead of `process.env` directly
2. **Error Handling**: Use custom error classes from `lib/utils/errors.ts`
3. **Database**: Use migrations for production, `db:push` for development
4. **Types**: Export types from schema files for type safety
5. **Auth**: Use middleware helpers for protected routes

## 🚢 Deployment

### Environment Variables

Set these in your deployment platform:

- `DATABASE_URL`
- `BETTER_AUTH_URL` (production URL)
- `BETTER_AUTH_SECRET`
- `NODE_ENV=production`

### Database Migrations

Run migrations on deployment:

```bash
pnpm db:migrate
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Supabase Docs](https://supabase.com/docs)

## 📄 License

MIT
