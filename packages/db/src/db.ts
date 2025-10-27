import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

if (!process.env.DATABASE_URL) {
  throw new Error("`DATABASE_URL` environment variable is required.")
}

export const client = postgres(process.env.DATABASE_URL, { prepare: false })
export const db = drizzle(client, { casing: "snake_case" })
