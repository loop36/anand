"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatedSection } from "@/components/animated-section"

interface SkillsSectionTriggerProps {
  onTrigger: () => void
  isTriggered: boolean
}

export function SkillsSectionTrigger({ onTrigger, isTriggered }: SkillsSectionTriggerProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered && !isTriggered) {
          setHasTriggered(true)
          onTrigger()
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [onTrigger, hasTriggered, isTriggered])

  return (
    <div ref={sectionRef} className="py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fade">
          <div className="text-center">
            <h3 className="text-xl font-light mb-6 tracking-tight">Core Technologies</h3>
            <div className="text-muted-foreground mb-8">Initializing skills display system...</div>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                <div className="w-full h-full bg-foreground animate-pulse" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
