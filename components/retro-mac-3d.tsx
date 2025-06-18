"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { useLenis } from "lenis/react"
import type * as THREE from "three"

// Skills that will scroll on the screen
const skills = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Vue.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "Redux",
  "GraphQL",
  "Tailwind CSS",
  "Material-UI",
  "Jest",
  "Cypress",
  "Webpack",
]

function MacComputer() {
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const [skillIndex, setSkillIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const lenis = useLenis()

  useFrame((state) => {
    if (!groupRef.current || !lenis) return

    const scrollProgress = lenis.scroll / lenis.limit
    const time = state.clock.elapsedTime

    // Determine visibility based on scroll position
    const aboutSectionStart = 0.15 // Approximate scroll position for about section
    const aboutSectionEnd = 0.35

    if (scrollProgress >= aboutSectionStart && scrollProgress <= aboutSectionEnd) {
      setIsVisible(true)
      // Animate to center during about section
      groupRef.current.position.x = 0
      groupRef.current.position.y = 0
      groupRef.current.position.z = 0
      groupRef.current.scale.setScalar(1.2)
    } else {
      setIsVisible(false)
      // Move to background
      groupRef.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 3
      groupRef.current.position.y = Math.cos(scrollProgress * Math.PI * 1.5) * 1
      groupRef.current.position.z = -2
      groupRef.current.scale.setScalar(0.6)
    }

    // Continuous rotation
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2 + time * 0.1
    groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.1
  })

  // Cycle through skills
  useEffect(() => {
    const interval = setInterval(() => {
      setSkillIndex((prev) => (prev + 1) % skills.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <group ref={groupRef} position={[2, 0, -1]}>
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
      <mesh ref={screenRef} position={[0, 0.8, 1.25]}>
        <boxGeometry args={[1.6, 1.2, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#002200" emissiveIntensity={0.3} />
      </mesh>

      {/* Screen Content */}
      {isVisible && (
        <Html
          position={[0, 0.8, 1.26]}
          transform
          occlude
          style={{
            width: "200px",
            height: "150px",
            background: "#000",
            color: "#00ff00",
            fontFamily: "monospace",
            fontSize: "12px",
            padding: "10px",
            overflow: "hidden",
            border: "1px solid #00ff00",
          }}
        >
          <div className="h-full flex flex-col justify-center items-center">
            <div className="text-center mb-2">SKILLS.EXE</div>
            <div className="text-lg font-bold animate-pulse">{skills[skillIndex]}</div>
            <div className="mt-2 text-xs">
              {skillIndex + 1}/{skills.length}
            </div>
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

      {/* Mouse Cable */}
      <mesh position={[1.3, -2.1, 0.8]}>
        <cylinderGeometry args={[0.01, 0.01, 0.8]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    </group>
  )
}

export function RetroMac3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 opacity-90">
      <Canvas
        camera={{
          position: [4, 2, 6],
          fov: 60,
        }}
        shadows
        style={{ background: "transparent" }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} color="#f5f5f4" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 5, 0]} intensity={0.4} color="#ffd700" />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#4ecdc4" />

        {/* Mac Computer */}
        <MacComputer />

        {/* Atmospheric fog */}
        <fog attach="fog" args={["#f5f5f4", 8, 20]} />
      </Canvas>
    </div>
  )
}
