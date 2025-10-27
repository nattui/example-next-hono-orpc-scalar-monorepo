import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import type { Router } from "api"
import { BASE_URL } from "@/utils/url"

export const client: Router = createORPCClient(
  new RPCLink({
    url: `${BASE_URL.WEB}/api`,
  }),
)
