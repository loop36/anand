"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, User, Briefcase, FolderOpen, Mail, Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

interface MobileNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MobileNavigation({ activeSection, setActiveSection }: MobileNavigationProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Work", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
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

  const getThemeIcon = () => {
    if (!mounted) return Monitor
    switch (theme) {
      case "light":
        return Sun
      case "dark":
        return Moon
      default:
        return Monitor
    }
  }

  const ThemeIcon = getThemeIcon()

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium tracking-wider">ANAND V BALAGOPALAN</div>
            <div className="flex items-center space-x-8">
              <div className="flex space-x-8 text-sm">
                {navItems.slice(1).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative hover:text-foreground transition-all duration-300 ${
                      activeSection === item.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <div className="absolute -bottom-1 left-0 w-full h-px bg-foreground transition-all duration-300" />
                    )}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={cycleTheme}
                className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/80"
              >
                <ThemeIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-foreground bg-accent/50"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            )
          })}

          {/* Theme Toggle for Mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleTheme}
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3 text-muted-foreground hover:text-foreground"
          >
            <ThemeIcon className="w-5 h-5" />
            <span className="text-xs font-medium">Theme</span>
          </Button>
        </div>
      </nav>
    </>
  )
}
