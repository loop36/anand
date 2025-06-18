"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Monitor } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-5 h-5" />
      case "dark":
        return <Moon className="w-5 h-5" />
      default:
        return <Monitor className="w-5 h-5" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light Mode"
      case "dark":
        return "Dark Mode"
      default:
        return "System Mode"
    }
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <Button
        variant="outline"
        onClick={cycleTheme}
        className="theme-toggle bg-background/90 backdrop-blur-md border-border/60 hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl px-4 py-2 h-auto group"
        title={`Current: ${getThemeLabel()}. Click to cycle themes.`}
      >
        <div className="flex items-center space-x-2">
          <div className="transition-transform duration-300 group-hover:scale-110">{getIcon()}</div>
          <span className="hidden sm:inline-block text-sm font-medium">{getThemeLabel()}</span>
        </div>
      </Button>

      {/* Theme indicator dots */}
      <div className="flex justify-center mt-2 space-x-1">
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            theme === "light" ? "bg-yellow-500 scale-125" : "bg-muted-foreground/30"
          }`}
        />
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            theme === "dark" ? "bg-blue-500 scale-125" : "bg-muted-foreground/30"
          }`}
        />
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            theme === "system" ? "bg-green-500 scale-125" : "bg-muted-foreground/30"
          }`}
        />
      </div>
    </div>
  )
}
