"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SectionTransitionManagerProps {
  currentSection: string
  onTransitionComplete?: () => void
}

// Default export
export default function SectionTransitionManager({
  currentSection,
  onTransitionComplete,
}: SectionTransitionManagerProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionText, setTransitionText] = useState("")
  const previousSection = useRef(currentSection)

  const sectionTitles: Record<string, string> = {
    home: "HOME",
    about: "ABOUT",
    experience: "EXPERIENCE",
    projects: "PROJECTS",
    contact: "CONTACT",
  }

  useEffect(() => {
    if (previousSection.current !== currentSection && currentSection !== "home") {
      setIsTransitioning(true)
      setTransitionText(sectionTitles[currentSection] || "")

      const timer = setTimeout(() => {
        setIsTransitioning(false)
        onTransitionComplete?.()
      }, 1500)

      previousSection.current = currentSection
      return () => clearTimeout(timer)
    }
    previousSection.current = currentSection
  }, [currentSection, onTransitionComplete])

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, rotateY: -90 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 1.5, rotateY: 90 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-center"
          >
            <motion.h1
              className="text-8xl md:text-9xl font-bold text-foreground"
              style={{
                textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #f59e0b)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {transitionText}
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 mt-4"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
