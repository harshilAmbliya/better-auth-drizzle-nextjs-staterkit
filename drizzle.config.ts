import { defineConfig } from "drizzle-kit";
import { env } from "./config/env";

// Load environment variables
// Note: drizzle-kit runs outside Next.js, so we need to load .env manually
// But since dotenv might not be available, we'll use process.env directly
// Make sure DATABASE_URL is set in your environment

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});

