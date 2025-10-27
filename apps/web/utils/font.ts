import { Inter, JetBrains_Mono } from "next/font/google"

const display = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500"],
})

const mono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
})

const sans = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
})

export const fontCssVariables = [
  display.variable,
  mono.variable,
  sans.variable,
].join(" ")
