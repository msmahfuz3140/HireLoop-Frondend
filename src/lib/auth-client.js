import { createAuthClient } from "better-auth/react";

// Next.js এ client-side env variables এর জন্য NEXT_PUBLIC_ prefix লাগে
const baseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession, signOut } = authClient;