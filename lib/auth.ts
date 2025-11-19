import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";
import { env } from "@/config/env";
import { session, verification, account, user } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    // Disable automatic login after sign-up
    requireEmailVerification: false,
  },
  trustedOrigins: [env.BETTER_AUTH_URL, "http://localhost:3005"],
  // socialProviders: {
  //     google: {
  //       enabled: true,
  //       clientId: env.GOOGLE_CLIENT_ID,
  //       clientSecret: env.GOOGLE_CLIENT_SECRET,
  //     },
  // },
  hooks: {
    before: async (inputContext) => {
      return inputContext;
    },
    after: async (inputContext) => {
      // Client-side sign out handles preventing auto-login after signup
      // This hook is kept for potential server-side session management if needed
      return inputContext;
    },
  },
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  plugins: [
    nextCookies(),
  ],
});