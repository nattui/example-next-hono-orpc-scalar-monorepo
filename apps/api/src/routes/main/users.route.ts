import { ORPCError } from "@orpc/server"
import { z } from "zod"
import { db } from "@/db"
import { schemaSelectUser, USER } from "@/schema/user.schema"
import { base } from "@/utils/context.util"

export const users = base
  .route({
    method: "GET",
    summary: "Get all users",
    tags: ["Main"],
  })
  .output(z.array(schemaSelectUser))
  .handler(async (options) => {
    try {
      const users = await db.select().from(USER)
      return users
    } catch (error) {
      if (error instanceof ORPCError) {
        throw error
      }
      throw options.errors.INTERNAL_SERVER_ERROR()
    }
  })
