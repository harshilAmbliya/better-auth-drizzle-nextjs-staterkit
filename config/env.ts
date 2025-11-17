/**
 * Environment Variables Configuration
 * 
 * Centralized environment variable validation and type-safe access
 * This ensures all required env vars are present and properly typed
 */

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Please check your .env file or environment configuration.`
    );
  }
  
  return value;
}

/**
 * Validated environment variables
 * Access these instead of process.env directly for type safety
 */
export const env = {
  // Database
  DATABASE_URL: getEnvVar("DATABASE_URL"),
  
  // Better Auth
  BETTER_AUTH_URL: getEnvVar("BETTER_AUTH_URL", "http://localhost:3005"),
  BETTER_AUTH_SECRET: getEnvVar("BETTER_AUTH_SECRET"),
  
  // Application
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
  PORT: getEnvVar("PORT", "3005"),
  
  // Helper functions
  isDevelopment: () => env.NODE_ENV === "development",
  isProduction: () => env.NODE_ENV === "production",
} as const;

