import { base } from "@/utils/context.util"

export const health = base
  .route({
    method: "GET",
    summary: "Health",
    tags: ["Main"],
  })
  .handler(async () => {
    return "Hello Hono!"
  })
