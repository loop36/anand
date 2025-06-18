"use client"

import { useEffect, useRef } from "react"

interface ScrollControllerProps {
  isLocked: boolean
  onComplete?: () => void
}

export function ScrollController({ isLocked, onComplete }: ScrollControllerProps) {
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    if (isLocked) {
      // Store current scroll position
      scrollPositionRef.current = window.scrollY

      // Prevent scrolling
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = "100%"
    } else {
      // Restore scrolling
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""

      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current)

      if (onComplete) {
        onComplete()
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [isLocked, onComplete])

  return null
}
