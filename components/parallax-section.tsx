"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useLenis } from "lenis/react"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis || !ref.current) return

    const handleScroll = () => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const scrolled = lenis.scroll
      const rate = scrolled * speed

      element.style.transform = `translateY(${rate}px)`
    }

    lenis.on("scroll", handleScroll)
    return () => lenis.off("scroll", handleScroll)
  }, [lenis, speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
