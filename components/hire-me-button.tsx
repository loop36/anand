"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export function HireMeButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleHireMe = () => {
    // Create a mailto link with pre-filled subject and body
    const subject = encodeURIComponent("Let's work together!")
    const body = encodeURIComponent(
      "Hi Anand,\n\nI'm interested in discussing a potential opportunity with you. Let's connect!\n\nBest regards,",
    )
    window.location.href = `mailto:anandvb2013@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={handleHireMe}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-700 hover:to-stone-800 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
        size="lg"
      >
        <Sparkles className={`w-5 h-5 mr-2 transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`} />
        <span className="font-medium text-lg">Hire Me</span>
        <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
      </Button>

      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-700 rounded-full blur-xl opacity-30 animate-pulse -z-10 scale-110" />
    </div>
  )
}
