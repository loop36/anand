"use client"

import { useEffect, useRef } from "react"
import { useLenis } from "lenis/react"
import Image from "next/image"

export function RetroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis || !containerRef.current) return

    const computers = containerRef.current.querySelectorAll(".retro-computer")

    const handleScroll = () => {
      const scrolled = lenis.scroll

      computers.forEach((computer, index) => {
        const speed = 0.1 + index * 0.05
        const yPos = -(scrolled * speed)
        const rotation = scrolled * 0.02 * (index + 1)
        const opacity = Math.max(0.03, 0.08 - scrolled * 0.00005)
        ;(computer as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`
        ;(computer as HTMLElement).style.opacity = opacity.toString()
      })
    }

    lenis.on("scroll", handleScroll)
    return () => lenis.off("scroll", handleScroll)
  }, [lenis])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Multiple retro computers at different positions */}
      <div className="retro-computer absolute top-20 -left-10 opacity-5">
        <Image src="/retro-computer.png" alt="" width={120} height={120} className="transform rotate-12" />
      </div>
      <div className="retro-computer absolute top-60 -right-16 opacity-4">
        <Image src="/retro-computer.png" alt="" width={100} height={100} className="transform -rotate-6" />
      </div>
      <div className="retro-computer absolute top-96 left-1/4 opacity-3">
        <Image src="/retro-computer.png" alt="" width={80} height={80} className="transform rotate-45" />
      </div>
      <div className="retro-computer absolute top-[600px] right-1/3 opacity-5">
        <Image src="/retro-computer.png" alt="" width={110} height={110} className="transform -rotate-12" />
      </div>
      <div className="retro-computer absolute top-[800px] left-1/2 opacity-4">
        <Image src="/retro-computer.png" alt="" width={90} height={90} className="transform rotate-90" />
      </div>
      <div className="retro-computer absolute top-[1000px] -left-8 opacity-3">
        <Image src="/retro-computer.png" alt="" width={130} height={130} className="transform rotate-6" />
      </div>
      <div className="retro-computer absolute top-[1200px] right-10 opacity-5">
        <Image src="/retro-computer.png" alt="" width={95} height={95} className="transform -rotate-30" />
      </div>
    </div>
  )
}
