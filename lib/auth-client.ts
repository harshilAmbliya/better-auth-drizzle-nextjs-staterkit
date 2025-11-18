import { createAuthClient } from "better-auth/react";

/**
 * Better Auth Client
 * 
 * Use this in client components to interact with authentication
 * 
 * @example
 * ```tsx
 * 'use client';
 * import { authClient } from '@/lib/auth-client';
 * 
 * const { data: session } = await authClient.getSession();
 * ```
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3005",
});