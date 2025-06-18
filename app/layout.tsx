import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LenisProvider } from "@/components/lenis-provider"
import { SwupProvider } from "@/components/swup-provider"
import { PageTransition } from "@/components/page-transition"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Anand V Balagopalan - Portfolio",
  description: "Senior Software Engineer & Frontend Lead",
  generator: "v0.dev",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SwupProvider>
            <LenisProvider>
              {children}
              <PageTransition />
            </LenisProvider>
          </SwupProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
