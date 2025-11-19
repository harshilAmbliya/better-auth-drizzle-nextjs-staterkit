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
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  plugins: [
    nextCookies(),
  ],
});