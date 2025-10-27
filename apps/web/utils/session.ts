"server-only"

import { cookies as getCookies } from "next/headers"
import { cache } from "react"
import { client } from "@/utils/client"

async function uncachedGetIsAuthenticated(): Promise<boolean> {
  try {
    const cookies = await getCookies()
    const session = cookies.get("session")?.value ?? ""
    if (!session) return false
    const isAuthenticated = await client.auth.verify({ session })
    return isAuthenticated
  } catch {
    return false
  }
}

export const getIsAuthenticated = cache(uncachedGetIsAuthenticated)
