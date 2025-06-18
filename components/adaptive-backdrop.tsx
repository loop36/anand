"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { useLenis } from "lenis/react"

export function AdaptiveBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis || !backdropRef.current) return

    const handleScroll = () => {
      const scrollProgress = lenis.scroll / lenis.limit
      const opacity = 0.85 + Math.sin(scrollProgress * Math.PI * 2) * 0.1

      if (backdropRef.current) {
        backdropRef.current.style.opacity = opacity.toString()
      }
    }

    lenis.on("scroll", handleScroll)
    return () => lenis.off("scroll", handleScroll)
  }, [lenis])

  const lightBackground = `
    radial-gradient(circle at 20% 20%, rgba(245, 245, 244, 0.9) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(245, 245, 244, 0.8) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(245, 245, 244, 0.7) 0%, transparent 50%),
    linear-gradient(135deg, rgba(245, 245, 244, 0.85) 0%, rgba(245, 245, 244, 0.75) 100%)
  `

  const darkBackground = `
    radial-gradient(circle at 20% 20%, rgba(15, 15, 15, 0.9) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(15, 15, 15, 0.8) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(15, 15, 15, 0.7) 0%, transparent 50%),
    linear-gradient(135deg, rgba(15, 15, 15, 0.85) 0%, rgba(15, 15, 15, 0.75) 100%)
  `

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-8 pointer-events-none transition-all duration-500"
      style={{
        background: theme === "dark" ? darkBackground : lightBackground,
      }}
    />
  )
}
