"use client"

import { authClient } from "./auth-client"

/**
 * Starts a Google sign-in flow using Better Auth.
 *
 * By default, users will be redirected to `/dashboard` after the
 * OAuth flow completes. You can override this by passing a custom
 * `redirectTo` path.
 */
export async function googleSignin(redirectTo: string = "/dashboard") {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: redirectTo,
  })
}

