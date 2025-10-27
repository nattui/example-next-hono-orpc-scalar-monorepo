import { base } from "@/utils/context.util"
import { deleteSession } from "@/utils/session.util"

export const signout = base
  .route({
    method: "POST",
    summary: "Sign out user",
    tags: ["Authentication"],
  })
  .handler(async (options) => {
    deleteSession(options.context.honoContext)
  })
