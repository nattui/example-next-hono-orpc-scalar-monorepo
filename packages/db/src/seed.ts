import { seed } from "drizzle-seed"
import { client, db } from "@/db"
import { ACCOUNT, PROFILE, USER } from "@/schema/user.schema"

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set")
  }

  const COUNT = 10
  const VERSION = "2"

  await seed(
    db,
    {
      account: ACCOUNT,
      profile: PROFILE,
      user: USER,
    },
    {
      count: COUNT,
      version: VERSION,
    },
  ).refine((f) => ({
    account: {
      columns: {
        password: f.loremIpsum({
          sentencesCount: 1,
        }),
        provider: f.valuesFromArray({
          values: [
            {
              values: ["credentials"],
              weight: 1,
            },
            {
              values: ["github"],
              weight: 0,
            },
            {
              values: ["google"],
              weight: 0,
            },
          ],
        }),
      },
    },
    profile: {
      columns: {
        image: f.string({
          isUnique: false,
        }),
      },
    },
    user: {
      columns: {
        email: f.email(),
        emailVerified: f.valuesFromArray({
          values: [
            {
              values: [true],
              weight: 0,
            },
            {
              values: [false],
              weight: 1,
            },
          ],
        }),
        name: f.fullName(),
        role: f.valuesFromArray({
          values: [
            {
              values: ["admin"],
              weight: 0,
            },
            {
              values: ["user"],
              weight: 1,
            },
          ],
        }),
      },
    },
  }))

  // Reset sequences after seeding to avoid primary key conflicts
  // Docs: https://github.com/drizzle-team/drizzle-orm/issues/3915
  console.log("Resetting sequences...")
  await db.execute(`
    SELECT setval(pg_get_serial_sequence('user', 'id'), COALESCE((SELECT MAX(id) FROM "user"), 1));
  `)
  await db.execute(`
    SELECT setval(pg_get_serial_sequence('account', 'id'), COALESCE((SELECT MAX(id) FROM "account"), 1));
  `)
  await db.execute(`
    SELECT setval(pg_get_serial_sequence('profile', 'id'), COALESCE((SELECT MAX(id) FROM "profile"), 1));
  `)
  console.log("Sequences reset successfully!")

  await client.end()
}

main()
