"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Create audio context for retro ambient sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    // Generate retro computer ambient sound
    const generateAmbientSound = () => {
      const oscillator1 = audioContext.createOscillator()
      const oscillator2 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()

      oscillator1.type = "sawtooth"
      oscillator1.frequency.setValueAtTime(60, audioContext.currentTime)

      oscillator2.type = "sine"
      oscillator2.frequency.setValueAtTime(120, audioContext.currentTime)

      filter.type = "lowpass"
      filter.frequency.setValueAtTime(200, audioContext.currentTime)

      gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime)

      oscillator1.connect(filter)
      oscillator2.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(audioContext.destination)

      if (isPlaying && !isMuted) {
        oscillator1.start()
        oscillator2.start()

        setTimeout(() => {
          oscillator1.stop()
          oscillator2.stop()
        }, 100)
      }
    }

    const interval = setInterval(() => {
      if (isPlaying && !isMuted) {
        generateAmbientSound()
      }
    }, 2000)

    return () => {
      clearInterval(interval)
      audioContext.close()
    }
  }, [isPlaying, isMuted, volume])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-all duration-300"
        title={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-all duration-300"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>

      <div className="hidden sm:flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-md px-3 py-2">
        <Volume2 className="w-3 h-3 text-muted-foreground" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
          className="w-16 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  )
}
