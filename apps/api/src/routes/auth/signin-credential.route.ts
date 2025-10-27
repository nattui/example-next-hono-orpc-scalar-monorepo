import { ORPCError } from "@orpc/server"
import { verify } from "argon2"
import { ACCOUNT, and, eq, USER } from "db"
import { z } from "zod"
import { db } from "@/db"
import { base } from "@/utils/context.util"
import { setSession } from "@/utils/session.util"

const schemaSigninCredential = z.object({
  email: z.string(),
  password: z.string(),
})

export const signinCredential = base
  .route({
    method: "POST",
    summary: "Sign in user with credential",
    tags: ["Authentication"],
  })
  .input(schemaSigninCredential)
  .handler(async (options) => {
    try {
      const { email, password } = options.input

      // Check if user with this email exists
      const [existingUser] = await db
        .select({
          hashedPassword: ACCOUNT.password,
          id: USER.id,
          name: USER.name,
        })
        .from(USER)
        .innerJoin(
          ACCOUNT,
          and(eq(ACCOUNT.userId, USER.id), eq(ACCOUNT.provider, "credentials")),
        )
        .where(eq(USER.email, email))
        .limit(1)

      if (!existingUser) {
        throw new ORPCError("UNAUTHORIZED", {
          message: "User with this email does not exist.",
        })
      }

      const hashedPassword = existingUser.hashedPassword ?? ""
      const isPasswordCorrect = await verify(hashedPassword, password)

      if (!isPasswordCorrect) {
        throw new ORPCError("UNAUTHORIZED", {
          message: "Invalid email or password.",
        })
      }

      await setSession({
        context: options.context.honoContext,
        id: existingUser.id,
        now: new Date(),
      })
    } catch (error) {
      if (error instanceof ORPCError) {
        throw error
      }

      throw options.errors.INTERNAL_SERVER_ERROR()
    }
  })
