import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, users } from "@/db";
import { nextCookies } from "better-auth/next-js";
import { env } from "@/config/env";

import { session, account, verification } from "@/db/schema/better-auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: session,
      account: account,
      verification: verification,
    },
  }),
  emailAndPassword: {
    enabled: true
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