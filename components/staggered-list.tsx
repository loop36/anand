"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface StaggeredListProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredList({ children, staggerDelay = 100, className = "" }: StaggeredListProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * staggerDelay)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [children, staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-out ${
            visibleItems.includes(index) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
