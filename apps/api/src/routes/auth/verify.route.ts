import { z } from "zod"
import { base } from "@/utils/context.util"
import { verifySession } from "@/utils/session.util"

const schemaAuthVerifyInput = z.object({
  session: z.string(),
})

const schemaAuthVerifyOutput = z.boolean()

export const verify = base
  .route({
    method: "GET",
    summary: "Verify user",
    tags: ["Authentication"],
  })
  .input(schemaAuthVerifyInput)
  .output(schemaAuthVerifyOutput)
  .handler(async (options) => {
    try {
      const session = options.input.session
      if (!session) return false

      const data = await verifySession(session)
      if (!data) return false

      return true
    } catch {
      return false
    }
  })
