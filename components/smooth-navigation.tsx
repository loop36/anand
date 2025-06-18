"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

interface SmoothNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function SmoothNavigation({ activeSection, setActiveSection }: SmoothNavigationProps) {
  const [isScrolling, setIsScrolling] = useState(false)
  const { theme, setTheme } = useTheme()

  const sections = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    setIsScrolling(true)
    setActiveSection(sectionId)

    const element = document.getElementById(sectionId)
    if (element) {
      // Calculate offset for fixed header
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Use smooth scrolling
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Remove transition class after scroll completes
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    } else {
      setIsScrolling(false)
    }
  }

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex items-center space-x-6">
      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-sm">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            disabled={isScrolling}
            className={`nav-link relative hover:text-stone-600 dark:hover:text-stone-300 transition-all duration-300 ${
              activeSection === section.id ? "text-stone-900 dark:text-stone-100" : "text-stone-500 dark:text-stone-400"
            } ${isScrolling ? "pointer-events-none" : ""}`}
          >
            {section.label}
            {activeSection === section.id && (
              <div className="absolute -bottom-1 left-0 w-full h-px bg-stone-900 dark:bg-stone-100 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Quick Dark Mode Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="w-8 h-8 hover:bg-accent/80 transition-all duration-300 group"
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        )}
      </Button>
    </div>
  )
}
