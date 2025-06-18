"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PortfolioLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("INITIALIZING...")
  const [isComplete, setIsComplete] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  const loadingPhases = [
    { text: "INITIALIZING PORTFOLIO...", duration: 800 },
    { text: "LOADING EXPERIENCE DATA...", duration: 600 },
    { text: "COMPILING PROJECTS...", duration: 700 },
    { text: "RENDERING INTERFACE...", duration: 500 },
    { text: "OPTIMIZING PERFORMANCE...", duration: 400 },
    { text: "FINALIZING SETUP...", duration: 300 },
    { text: "WELCOME TO ANAND.DEV", duration: 1000 },
  ]

  useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let phaseTimeout: NodeJS.Timeout

    const startLoading = () => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 8 + 2 // Random increment between 2-10
          const newProgress = Math.min(prev + increment, 100)

          if (newProgress >= 100) {
            clearInterval(progressInterval)
            setProgress(100)
            setTimeout(() => {
              setIsComplete(true)
              setTimeout(onComplete, 800)
            }, 500)
            return 100
          }
          return newProgress
        })
      }, 120)

      // Phase progression
      const progressPhases = () => {
        if (currentPhase < loadingPhases.length - 1) {
          phaseTimeout = setTimeout(() => {
            setCurrentPhase((prev) => prev + 1)
            setLoadingText(loadingPhases[currentPhase + 1]?.text || "COMPLETE")
            progressPhases()
          }, loadingPhases[currentPhase]?.duration || 500)
        }
      }

      progressPhases()
    }

    startLoading()

    return () => {
      clearInterval(progressInterval)
      clearTimeout(phaseTimeout)
    }
  }, [currentPhase, onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 flex items-center justify-center font-mono overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(120, 113, 108, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(120, 113, 108, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                animation: "grid-move 20s linear infinite",
              }}
            />
          </div>

          {/* Floating particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-stone-400 dark:bg-stone-500 rounded-full opacity-40"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              animate={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}

          <div className="text-center z-10 max-w-2xl mx-auto px-8">
            {/* Main Logo/Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-light mb-4 text-stone-800 dark:text-stone-200"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                ANAND
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Portfolio Loading...
              </motion.p>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto mb-6">
                <div className="flex justify-between text-stone-700 dark:text-stone-300 text-sm mb-3">
                  <span className="font-medium">LOADING</span>
                  <span className="font-mono">{Math.floor(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-stone-300 dark:bg-stone-600 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-stone-600 via-stone-700 to-stone-800 dark:from-stone-400 dark:via-stone-300 dark:to-stone-200 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Loading Text */}
              <motion.div
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-stone-700 dark:text-stone-300 text-lg tracking-wider mb-2"
              >
                {loadingText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-1"
                >
                  _
                </motion.span>
              </motion.div>

              {/* Phase Indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                {loadingPhases.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentPhase ? "bg-stone-600 dark:bg-stone-400" : "bg-stone-300 dark:bg-stone-600"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* System Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-stone-500 dark:text-stone-400 text-sm space-y-1 font-mono"
            >
              <div>SYSTEM: PORTFOLIO OS v2.0</div>
              <div>DEVELOPER: ANAND V BALAGOPALAN</div>
              <div>STACK: REACT + TYPESCRIPT + NEXT.JS</div>
              <div>STATUS: {progress < 100 ? "LOADING..." : "READY"}</div>
            </motion.div>

            {/* Completion Animation */}
            {progress >= 100 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  ✓
                </motion.div>
                <div className="text-stone-600 dark:text-stone-400 font-medium">INITIALIZATION COMPLETE</div>
              </motion.div>
            )}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-stone-400/30 dark:border-stone-500/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-stone-400/30 dark:border-stone-500/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-stone-400/30 dark:border-stone-500/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-stone-400/30 dark:border-stone-500/30" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
