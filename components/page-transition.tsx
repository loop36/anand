"use client"

import { useEffect, useState } from "react"

export function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleTransitionStart = () => setIsTransitioning(true)
    const handleTransitionEnd = () => setIsTransitioning(false)

    document.addEventListener("swup:animationOutStart", handleTransitionStart)
    document.addEventListener("swup:animationInEnd", handleTransitionEnd)

    return () => {
      document.removeEventListener("swup:animationOutStart", handleTransitionStart)
      document.removeEventListener("swup:animationInEnd", handleTransitionEnd)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 bg-stone-50 transition-all duration-600 ease-in-out pointer-events-none ${
        isTransitioning ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
      </div>
    </div>
  )
}
