import { client } from "@/utils/client"

export default async function HealthPage() {
  const data = await client.health()

  return (
    <div>
      <p>{data}</p>
    </div>
  )
}
