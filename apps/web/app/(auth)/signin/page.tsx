import { redirect } from "next/navigation"
import SignInForm from "@/app/(auth)/signin/form"
import ButtonSignOut from "@/components/button-sign-out"
import { getIsAuthenticated } from "@/utils/session"

export default async function SignInPage() {
  const isAuthenticated = await getIsAuthenticated()

  if (isAuthenticated) redirect("/")

  return (
    <div className="flex flex-col gap-y-16 p-16">
      <h1 className="text-24">Sign in page</h1>
      {isAuthenticated ? <ButtonSignOut variant="primary" /> : <SignInForm />}
    </div>
  )
}
