"use client"

import { useLenis } from "lenis/react"
import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      const scrollTop = lenis.scroll
      const scrollHeight = lenis.limit
      const progress = scrollTop / scrollHeight
      setProgress(progress)
    }

    lenis.on("scroll", handleScroll)
    return () => lenis.off("scroll", handleScroll)
  }, [lenis])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-stone-600 to-stone-800 transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
