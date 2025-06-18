"use client"

import { motion } from "framer-motion"

interface ThreeDTextFallbackProps {
  currentSection: string
  scrollProgress: number
}

// Default export
export default function ThreeDTextFallback({ currentSection, scrollProgress }: ThreeDTextFallbackProps) {
  const sectionTitles: Record<string, string> = {
    about: "ABOUT",
    experience: "EXPERIENCE",
    projects: "PROJECTS",
    contact: "CONTACT",
  }

  if (currentSection === "home") {
    return (
      <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.8, scale: 1 }} className="text-center">
          <motion.h1
            className="text-8xl md:text-9xl font-bold gradient-text text-3d-glow"
            animate={{ rotateY: scrollProgress * 360 }}
          >
            ANAND
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl font-light text-muted-foreground mt-4"
            animate={{ rotateY: scrollProgress * -180 }}
          >
            DEVELOPER
          </motion.p>
        </motion.div>
      </div>
    )
  }

  const currentTitle = sectionTitles[currentSection]
  if (!currentTitle) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 1.5, rotateY: 90 }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none"
    >
      <h1 className="text-8xl md:text-9xl font-bold gradient-text text-3d-glow">{currentTitle}</h1>
    </motion.div>
  )
}
