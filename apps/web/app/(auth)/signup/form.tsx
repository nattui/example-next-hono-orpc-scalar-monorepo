"use client"

import { Button, Input, Label } from "@nattui/react-components"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { client } from "@/utils/client"

export default function SignUpForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    if (!(form instanceof HTMLFormElement)) {
      throw new Error("Form is not a valid HTML form element.")
    }
    const formData = new FormData(form)

    const email = formData.get("email")
    const name = formData.get("name")
    const password = formData.get("password")
    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof password !== "string"
    ) {
      throw new Error("Email, name, and password must be strings.")
    }

    setIsLoading(true)
    try {
      await client.auth.signup.credential({
        email,
        name,
        password,
      })
      router.refresh()
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <form className="flex max-w-240 flex-col" onSubmit={onSubmit}>
      <Label className="mb-2 inline-block w-fit text-14" htmlFor="name">
        Name
      </Label>
      <Input
        className="mb-16 h-36 border border-amber-100 border-solid px-4"
        defaultValue="Mark Scout"
        id="name"
        isRequired
        name="name"
        type="text"
      />
      <Label className="mb-2 inline-block w-fit text-14" htmlFor="email">
        Email
      </Label>
      <Input
        className="mb-16 h-36 border border-amber-100 border-solid px-4"
        defaultValue="test@test.com"
        id="email"
        isRequired
        name="email"
        type="email"
      />
      <Label className="mb-2 inline-block w-fit text-14" htmlFor="password">
        Password
      </Label>
      <Input
        className="mb-16 h-36 border border-amber-100 border-solid px-4"
        defaultValue="123123"
        id="password"
        isRequired
        name="password"
        type="password"
      />
      <Button isLoading={isLoading} type="submit">
        Sign up
      </Button>
    </form>
  )
}
