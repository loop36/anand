"use client"

import { useEffect, useRef } from "react"
import { useLenis } from "lenis/react"

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis || !containerRef.current) return

    const elements = containerRef.current.querySelectorAll(".floating-element")

    const handleScroll = () => {
      const scrolled = lenis.scroll

      elements.forEach((element, index) => {
        const speed = 0.2 + index * 0.1
        const yPos = -(scrolled * speed)
        const rotation = scrolled * 0.05 * (index + 1)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`
      })
    }

    lenis.on("scroll", handleScroll)
    return () => lenis.off("scroll", handleScroll)
  }, [lenis])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-stone-300 opacity-20 rotate-45" />
      <div className="floating-element absolute top-40 right-20 w-6 h-6 border border-stone-400 opacity-15 rounded-full" />
      <div className="floating-element absolute top-60 left-1/4 w-3 h-3 bg-stone-400 opacity-25" />
      <div className="floating-element absolute top-80 right-1/3 w-5 h-5 border border-stone-300 opacity-20 rotate-12" />
      <div className="floating-element absolute top-96 left-3/4 w-2 h-2 bg-stone-500 opacity-30 rounded-full" />
      <div className="floating-element absolute top-[500px] right-10 w-4 h-4 border border-stone-400 opacity-15 rotate-45" />
      <div className="floating-element absolute top-[600px] left-1/2 w-3 h-3 bg-stone-300 opacity-25 rotate-90" />
      <div className="floating-element absolute top-[700px] right-1/4 w-5 h-5 border border-stone-500 opacity-20 rounded-full" />
    </div>
  )
}
