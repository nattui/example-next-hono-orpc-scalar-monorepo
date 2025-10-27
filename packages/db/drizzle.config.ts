// ====================================================== /
// :: Notes ::
// bun run db:generate
// bun run db:migrate
// ====================================================== /

import { defineConfig } from "drizzle-kit"

if (!process.env.DATABASE_URL) {
  throw new Error("`DATABASE_URL` environment variable is required.")
}

export default defineConfig({
  casing: "snake_case",
  dbCredentials: { url: process.env.DATABASE_URL },
  dialect: "postgresql",
  out: "./src/migrations",
  schema: "./src/schema",
})
