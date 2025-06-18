import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LenisProvider } from "@/components/lenis-provider"
import { SwupProvider } from "@/components/swup-provider"
import { PageTransition } from "@/components/page-transition"

export const metadata: Metadata = {
  title: "Anand V Balagopalan - Portfolio",
  description: "Senior Software Engineer & Frontend Lead",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SwupProvider>
          <LenisProvider>
            {children}
            <PageTransition />
          </LenisProvider>
        </SwupProvider>
      </body>
    </html>
  )
}
