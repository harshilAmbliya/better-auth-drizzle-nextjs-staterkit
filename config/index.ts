/**
 * Application Configuration
 * 
 * Centralized configuration for the entire application
 */

export { env } from "./env";

// Application constants
export const config = {
  app: {
    name: "Better Auth Starter",
    version: "0.1.0",
  },
  api: {
    timeout: 30000, // 30 seconds
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
} as const;

