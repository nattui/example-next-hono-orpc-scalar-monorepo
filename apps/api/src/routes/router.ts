import type { RouterClient } from "@orpc/server"
import { signinCredential } from "@/routes/auth/signin-credential.route"
import { signout } from "@/routes/auth/signout.route"
import { signupCredential } from "@/routes/auth/signup-credential.route"
import { verify } from "@/routes/auth/verify.route"
import { health } from "@/routes/main/health.route"
import { users } from "@/routes/main/users.route"

export const router = {
  auth: {
    signin: {
      credential: signinCredential,
    },
    signout,
    signup: {
      credential: signupCredential,
    },
    verify,
  },
  health,
  users,
}

export type Router = RouterClient<typeof router>
