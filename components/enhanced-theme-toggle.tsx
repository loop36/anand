"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Monitor, Palette } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function EnhancedThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ]

  const currentTheme = themes.find((t) => t.id === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowOptions(!showOptions)}
        className="fixed top-6 right-6 z-50 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-all duration-300 group"
        title={`Current theme: ${currentTheme.label}`}
      >
        <CurrentIcon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
      </Button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="fixed top-16 right-6 z-50 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg p-2"
          >
            <div className="flex items-center space-x-1 mb-2">
              <Palette className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">THEME</span>
            </div>
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              return (
                <Button
                  key={themeOption.id}
                  variant={theme === themeOption.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setTheme(themeOption.id)
                    setShowOptions(false)
                  }}
                  className="w-full justify-start mb-1 last:mb-0"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {themeOption.label}
                </Button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {showOptions && <div className="fixed inset-0 z-40" onClick={() => setShowOptions(false)} />}
    </div>
  )
}
