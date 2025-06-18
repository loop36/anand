"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function RetroLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("INITIALIZING...")
  const [isComplete, setIsComplete] = useState(false)

  const loadingMessages = [
    "INITIALIZING...",
    "LOADING SYSTEM...",
    "CHECKING MEMORY...",
    "LOADING PORTFOLIO...",
    "PREPARING INTERFACE...",
    "ALMOST READY...",
    "WELCOME TO ANAND.DEV",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15

        // Update loading text based on progress
        const messageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1))
        setLoadingText(loadingMessages[messageIndex] || loadingMessages[0])

        if (newProgress >= 100) {
          clearInterval(interval)
          setProgress(100)
          setLoadingText("COMPLETE")
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 500)
          }, 1000)
          return 100
        }
        return newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono"
        >
          {/* Retro CRT effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />

          {/* Scanlines */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="w-full h-px bg-green-400" style={{ marginTop: `${i * 2}vh` }} />
            ))}
          </div>

          <div className="text-center z-10">
            {/* Computer ASCII Art */}
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-xs mb-8 leading-tight"
            >
              {`
    ┌─────────────────────┐
    │  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  │
    │  █               █  │
    │  █   ANAND.DEV   █  │
    │  █               █  │
    │  █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█  │
    │  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  │
    └─────────────────────┘
              `}
            </motion.pre>

            {/* Progress Bar */}
            <div className="w-80 mx-auto mb-6">
              <div className="flex justify-between text-green-400 text-sm mb-2">
                <span>LOADING</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="w-full h-4 border-2 border-green-400 bg-black">
                <motion.div
                  className="h-full bg-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Loading Text */}
            <motion.div
              key={loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-lg tracking-wider"
            >
              {loadingText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              >
                _
              </motion.span>
            </motion.div>

            {/* System Info */}
            <div className="mt-8 text-green-400 text-xs space-y-1">
              <div>SYSTEM: PORTFOLIO OS v2.0</div>
              <div>MEMORY: 640K EXPERIENCE</div>
              <div>SKILLS: JAVASCRIPT, REACT, TYPESCRIPT</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
