/**
 * Authentication Middleware Utilities
 * 
 * Helper functions for protecting routes and checking authentication
 */

import { auth } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/utils/errors";
import { headers } from "next/headers";

/**
 * Get the current session from the request
 * Returns null if not authenticated
 */
export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch {
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 * Use this in server components or API routes
 * 
 * @throws {UnauthorizedError} If user is not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    throw new UnauthorizedError("You must be authenticated to access this resource");
  }
  
  return session;
}

/**
 * Get the current user from the session
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Require a specific role (if you add roles to your user schema)
 * 
 * @example
 * ```ts
 * const user = await requireRole("admin");
 * ```
 */
export async function requireRole(role: string) {
  const session = await requireAuth();
  
  // TODO: Implement role checking when you add roles to your schema
  // if (session.user.role !== role) {
  //   throw new UnauthorizedError(`Requires ${role} role`);
  // }
  
  return session;
}

