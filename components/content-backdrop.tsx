"use client"

import { useEffect, useRef } from "react"
import { useLenis } from "lenis/react"

export function ContentBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null)
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

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-8 pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(245, 245, 244, 0.9) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(245, 245, 244, 0.8) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(245, 245, 244, 0.7) 0%, transparent 50%),
          linear-gradient(135deg, rgba(245, 245, 244, 0.85) 0%, rgba(245, 245, 244, 0.75) 100%)
        `,
      }}
    />
  )
}
