"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { motion } from "framer-motion"
import type * as THREE from "three"

const skills = [
  { name: "JavaScript", level: 95, color: "#f7df1e" },
  { name: "TypeScript", level: 90, color: "#3178c6" },
  { name: "React.js", level: 95, color: "#61dafb" },
  { name: "Next.js", level: 85, color: "#000000" },
  { name: "Vue.js", level: 80, color: "#4fc08d" },
  { name: "Node.js", level: 85, color: "#339933" },
  { name: "Python", level: 75, color: "#3776ab" },
  { name: "PostgreSQL", level: 80, color: "#336791" },
  { name: "MongoDB", level: 75, color: "#47a248" },
  { name: "AWS", level: 70, color: "#ff9900" },
  { name: "Docker", level: 75, color: "#2496ed" },
  { name: "Redux Toolkit", level: 85, color: "#764abc" },
]

interface MacComputerProps {
  isActive: boolean
  currentSkill: number
  onSkillComplete: () => void
}

function MacComputer({ isActive, currentSkill, onSkillComplete }: MacComputerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [animationPhase, setAnimationPhase] = useState<"entering" | "active" | "exiting">("entering")

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    if (isActive) {
      if (animationPhase === "entering") {
        // Animate to center position
        groupRef.current.position.x = 0
        groupRef.current.position.y = 0
        groupRef.current.position.z = 0
        groupRef.current.scale.setScalar(1.5)
        groupRef.current.rotation.y = 0

        setTimeout(() => setAnimationPhase("active"), 1000)
      } else if (animationPhase === "active") {
        // Gentle floating animation
        groupRef.current.position.y = Math.sin(time * 0.5) * 0.1
        groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05
      }
    } else if (animationPhase === "active") {
      setAnimationPhase("exiting")
      setTimeout(onSkillComplete, 1000)
    }
  })

  const currentSkillData = skills[currentSkill] || skills[0]

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Main Computer Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 3.2, 2.4]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Screen Bezel */}
      <mesh position={[0, 0.8, 1.21]}>
        <boxGeometry args={[2.0, 1.6, 0.1]} />
        <meshStandardMaterial color="#e8e8e0" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.8, 1.25]}>
        <boxGeometry args={[1.6, 1.2, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#002200" emissiveIntensity={0.3} />
      </mesh>

      {/* Screen Content */}
      {isActive && (
        <Html
          position={[0, 0.8, 1.26]}
          transform
          occlude
          style={{
            width: "320px",
            height: "240px",
            pointerEvents: "none",
          }}
        >
          <div className="w-full h-full bg-black border-2 border-green-400 font-mono text-green-400 p-4 overflow-hidden">
            <div className="text-center mb-4">
              <div className="text-sm mb-2">ANAND.DEV - SKILLS.EXE</div>
              <div className="text-xs">Loading Technologies...</div>
            </div>

            <div className="space-y-2">
              {skills.slice(0, currentSkill + 1).map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="truncate">{skill.name}</span>
                  <div className="flex items-center ml-2">
                    <div className="w-12 h-1 bg-gray-700 mr-1">
                      <motion.div
                        className="h-full bg-green-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.3 + 0.2, duration: 0.8 }}
                      />
                    </div>
                    <span className="text-xs w-8 text-right">{skill.level}%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {currentSkill < skills.length - 1 && (
              <div className="absolute bottom-2 left-4 right-4">
                <div className="flex justify-between text-xs">
                  <span>Progress:</span>
                  <span>
                    {currentSkill + 1}/{skills.length}
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-700 mt-1">
                  <motion.div
                    className="h-full bg-green-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSkill + 1) / skills.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {currentSkill >= skills.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-2 left-4 right-4 text-center"
              >
                <div className="text-xs text-green-400 animate-pulse">LOADING COMPLETE - PRESS ANY KEY</div>
              </motion.div>
            )}
          </div>
        </Html>
      )}

      {/* Floppy Drive */}
      <mesh position={[0.6, -0.2, 1.21]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Apple Logo */}
      <group position={[-0.6, -0.8, 1.21]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#ff4757" emissive="#ff4757" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffa502" emissive="#ffa502" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#2ed573" emissive="#2ed573" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#3742fa" emissive="#3742fa" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Ventilation Grilles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[1.1, -1.2 + i * 0.15, 1.21]}>
          <boxGeometry args={[0.2, 0.02, 0.01]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>
      ))}

      {/* Base/Stand */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[1.4, 1.6, 0.3]} />
        <meshStandardMaterial color="#f0f0e8" />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, -2.2, 1.5]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>

      {/* Mouse */}
      <mesh position={[1.5, -2.15, 1.2]}>
        <boxGeometry args={[0.3, 0.05, 0.4]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>
    </group>
  )
}

interface InteractiveMacSkillsProps {
  isActive: boolean
  onComplete: () => void
}

export function InteractiveMacSkills({ isActive, onComplete }: InteractiveMacSkillsProps) {
  const [currentSkill, setCurrentSkill] = useState(0)
  const [isSkillsComplete, setIsSkillsComplete] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setCurrentSkill(0)
      setIsSkillsComplete(false)
      return
    }

    const interval = setInterval(() => {
      setCurrentSkill((prev) => {
        if (prev >= skills.length - 1) {
          setIsSkillsComplete(true)
          clearInterval(interval)
          // Auto-complete after showing all skills for 2 seconds
          setTimeout(() => {
            onComplete()
          }, 2000)
          return prev
        }
        return prev + 1
      })
    }, 1000) // Show each skill for 1 second

    return () => clearInterval(interval)
  }, [isActive, onComplete])

  // Handle keyboard interaction to skip
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isActive && isSkillsComplete) {
        onComplete()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isActive, isSkillsComplete, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
        shadows
        style={{ background: "transparent" }}
      >
        {/* Enhanced Lighting for focus */}
        <ambientLight intensity={0.6} color="#f5f5f4" />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" castShadow />
        <pointLight position={[0, 3, 3]} intensity={0.8} color="#ffd700" />

        <MacComputer isActive={isActive} currentSkill={currentSkill} onSkillComplete={onComplete} />

        <fog attach="fog" args={["#f5f5f4", 10, 20]} />
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-muted-foreground text-sm"
        >
          {isSkillsComplete ? (
            <div className="space-y-2">
              <div className="text-foreground font-medium">Skills Loading Complete!</div>
              <div className="text-xs">Press any key or wait to continue...</div>
            </div>
          ) : (
            <div className="space-y-2">
              <div>Loading Core Technologies...</div>
              <div className="text-xs">
                Skill {currentSkill + 1} of {skills.length}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
