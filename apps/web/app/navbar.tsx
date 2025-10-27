import Link, { type LinkProps } from "next/link"
import ButtonSignOut from "@/components/button-sign-out"

interface NavbarProps {
  isAuthenticated: boolean
}

export function Navbar(props: NavbarProps) {
  const { isAuthenticated } = props

  return (
    <header className="flex h-64 items-center gap-16 px-16">
      <NavbarLink href="/">Home</NavbarLink>
      <NavbarLink href="/health">Health</NavbarLink>
      {!isAuthenticated && <NavbarLink href="/signin">Sign in</NavbarLink>}
      {!isAuthenticated && <NavbarLink href="/signup">Sign up</NavbarLink>}
      {isAuthenticated && <ButtonSignOut />}
    </header>
  )
}

function NavbarLink(props: LinkProps<string>) {
  const { children, href, ...rest } = props

  return (
    <Link
      className={`text-14 text-primary-11 transition-colors hover:text-primary-12 hover:underline`}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  )
}
