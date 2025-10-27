import { Users } from "@/app/users"

export default function HomePage() {
  return (
    <div className="flex flex-col p-16">
      <h1 className="mb-16 text-24">Home page</h1>
      <Users />
    </div>
  )
}
