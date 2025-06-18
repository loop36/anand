"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade" | "slide" | "scale" | "rotate"
  delay?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold])

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out"

    switch (animation) {
      case "slide":
        return `${baseClasses} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`
      case "scale":
        return `${baseClasses} ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`
      case "rotate":
        return `${baseClasses} ${isVisible ? "rotate-0 opacity-100" : "rotate-1 opacity-0"}`
      default:
        return `${baseClasses} ${isVisible ? "opacity-100" : "opacity-0"}`
    }
  }

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  )
}
