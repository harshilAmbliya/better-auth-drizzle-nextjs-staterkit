/**
 * Database Configuration and Utilities
 * 
 * This file sets up the Drizzle ORM connection to Supabase PostgreSQL
 * and provides utility functions for database operations.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "@/config/env";

// Note: Next.js automatically loads .env files, so we don't need dotenv.config() here

// ============================================================================
// Database Connection Setup
// ============================================================================

/**
 * Get database URL from environment variables
 */
const connectionString = env.DATABASE_URL;

/**
 * Create PostgreSQL client
 * Disable prefetch as it is not supported for "Transaction" pool mode
 * 
 * Note: Supabase connection warnings about "supautils" are harmless and can be ignored.
 * They occur because Supabase uses reserved parameter prefixes in connection strings.
 */
const client = postgres(connectionString, { 
  prepare: false,
  // Optionally filter out Supabase-specific warnings (they're harmless)
  onnotice: () => {}, // Suppress notices/warnings in logs
});

/**
 * Create Drizzle instance with schema
 * This is the main database instance used throughout the application
 */
export const db = drizzle(client, { schema });

// ============================================================================
// Schema Exports
// ============================================================================

/**
 * Export all schemas for use in other files
 */
export * from "./schema";

// ============================================================================
// Database Utility Functions
// ============================================================================

/**
 * Health check function to verify database connection
 * 
 * @returns Promise with connection status
 * 
 * @example
 * ```ts
 * const result = await checkDatabaseConnection();
 * if (result.success) {
 *   console.log("Database is connected!");
 * }
 * ```
 */
export async function checkDatabaseConnection() {
  try {
    // Simple query to check connection
    await db.execute(sql`SELECT 1`);
    return { success: true, message: "Database connection successful" };
  } catch (error) {
    return {
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Transaction helper for complex operations
 * 
 * @template T - The return type of the transaction callback
 * @param callback - Function that receives the transaction instance
 * @returns Promise with the result of the callback
 * 
 * @example
 * ```ts
 * await withTransaction(async (tx) => {
 *   await tx.insert(users).values({ email: "user@example.com", name: "User" });
 *   await tx.insert(posts).values({ title: "Post", userId: userId });
 * });
 * ```
 */
export async function withTransaction<T>(
  callback: (tx: Parameters<Parameters<typeof db.transaction>[0]>[0]) => Promise<T>
): Promise<T> {
  return await db.transaction(callback);
}

