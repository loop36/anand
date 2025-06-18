"use client"

import { useState } from "react"

interface SmoothNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function SmoothNavigation({ activeSection, setActiveSection }: SmoothNavigationProps) {
  const [isScrolling, setIsScrolling] = useState(false)

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

  return (
    <div className="hidden md:flex space-x-8 text-sm">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          disabled={isScrolling}
          className={`relative hover:text-stone-600 transition-all duration-300 ${
            activeSection === section.id ? "text-stone-900" : "text-stone-500"
          } ${isScrolling ? "pointer-events-none" : ""}`}
        >
          {section.label}
          {activeSection === section.id && (
            <div className="absolute -bottom-1 left-0 w-full h-px bg-stone-900 transition-all duration-300" />
          )}
        </button>
      ))}
    </div>
  )
}
