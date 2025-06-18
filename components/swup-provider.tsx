"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

interface SwupProviderProps {
  children: ReactNode
}

export function SwupProvider({ children }: SwupProviderProps) {
  const swupRef = useRef<any>(null)

  useEffect(() => {
    const initSwup = async () => {
      const { default: Swup } = await import("swup")
      const { default: SwupFadeTheme } = await import("@swup/fade-theme")
      const { default: SwupSlideTheme } = await import("@swup/slide-theme")
      const { default: SwupScrollPlugin } = await import("@swup/scroll-plugin")

      swupRef.current = new Swup({
        containers: ["#swup"],
        animateHistoryBrowsing: true,
        linkSelector: 'a[href^="#"]:not([data-no-swup])',
        animationSelector: '[class*="transition-"]',
        plugins: [
          new SwupFadeTheme({
            mode: "simultaneous",
            duration: 600,
          }),
          new SwupScrollPlugin({
            doScrollingRightAway: false,
            animateScroll: true,
            scrollFriction: 0.3,
            scrollAcceleration: 0.04,
          }),
        ],
      })

      // Custom animations for different sections
      swupRef.current.hooks.on("animation:out:start", () => {
        document.body.classList.add("is-animating-out")
      })

      swupRef.current.hooks.on("animation:in:end", () => {
        document.body.classList.remove("is-animating-out")
        document.body.classList.remove("is-animating-in")
      })

      swupRef.current.hooks.on("animation:in:start", () => {
        document.body.classList.add("is-animating-in")
      })
    }

    initSwup()

    return () => {
      if (swupRef.current) {
        swupRef.current.destroy()
      }
    }
  }, [])

  return <div id="swup">{children}</div>
}
