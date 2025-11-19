import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";
import { env } from "@/config/env";
import { session, verification, account, user } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";

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
  magicLink: {
    enabled: true,
    sendMagicLink: async ({ email, url, token }: { email: string, url: string, token: string }) => {
      console.log("Sending magic link to", email, url, token);
      const response = await fetch(`${env.BETTER_AUTH_URL}/api/auth/magic-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Failed to send magic link", { cause: response.statusText });
      }
      return true;
    },
  },
  trustedOrigins: [env.BETTER_AUTH_URL, "http://localhost:3005"],
  socialProviders: {
      google: {
        enabled: true,
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
      github: {
        enabled: true,
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      },
  },
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  plugins: [
    nextCookies(),
    magicLink({
      disableSignUp: true, // Disable using magic link at signup
      sendMagicLink: async ({email, url}) => {
        const resend = new Resend(env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: email,
          subject: "Magic Link for Better Auth",
          html: `Click the link to login into your account: ${url}`,
        });
      }
    }),
  ],
});