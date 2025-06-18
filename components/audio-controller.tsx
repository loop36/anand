"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Create the audio element
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/retro-ambient.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = volume

      // Add event listeners
      audioRef.current.addEventListener("loadeddata", () => {
        console.log("Audio loaded successfully")
      })

      audioRef.current.addEventListener("error", (e) => {
        console.log("Audio loading error, falling back to generated audio")
        // Fallback to generated audio if file doesn't load
        generateRetroAmbient()
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const generateRetroAmbient = () => {
    // Fallback: Generate retro computer ambient sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      const createRetroTone = () => {
        const oscillator1 = audioContext.createOscillator()
        const oscillator2 = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        const filter = audioContext.createBiquadFilter()

        oscillator1.type = "sawtooth"
        oscillator1.frequency.setValueAtTime(40 + Math.random() * 20, audioContext.currentTime)

        oscillator2.type = "sine"
        oscillator2.frequency.setValueAtTime(80 + Math.random() * 40, audioContext.currentTime)

        filter.type = "lowpass"
        filter.frequency.setValueAtTime(150 + Math.random() * 100, audioContext.currentTime)
        filter.Q.setValueAtTime(1, audioContext.currentTime)

        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(volume * 0.05, audioContext.currentTime + 0.1)
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2)

        oscillator1.connect(filter)
        oscillator2.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(audioContext.destination)

        if (isPlaying && !isMuted) {
          oscillator1.start()
          oscillator2.start()

          setTimeout(() => {
            try {
              oscillator1.stop()
              oscillator2.stop()
            } catch (e) {
              // Ignore errors when stopping oscillators
            }
          }, 2000)
        }
      }

      if (isPlaying && !isMuted) {
        createRetroTone()
        // Create ambient tones every 3-8 seconds
        setTimeout(
          () => {
            if (isPlaying && !isMuted) {
              generateRetroAmbient()
            }
          },
          3000 + Math.random() * 5000,
        )
      }
    } catch (error) {
      console.log("Web Audio API not supported")
    }
  }

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Try to play the audio file
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log("Audio playback failed, using generated audio")
      setIsPlaying(!isPlaying)
      if (!isPlaying) {
        generateRetroAmbient()
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="bg-background/90 backdrop-blur-md border-border/60 hover:bg-accent/90 transition-all duration-300 shadow-lg"
        title={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="bg-background/90 backdrop-blur-md border-border/60 hover:bg-accent/90 transition-all duration-300 shadow-lg"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>

      <div className="hidden sm:flex items-center space-x-2 bg-background/90 backdrop-blur-md border border-border/60 rounded-md px-3 py-2 shadow-lg">
        <Volume2 className="w-3 h-3 text-muted-foreground" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  )
}
