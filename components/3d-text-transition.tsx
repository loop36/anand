"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, extend } from "@react-three/fiber"
import { Text3D, Center, Float } from "@react-three/drei"
import type * as THREE from "three"

// Extend Three.js with additional materials if needed
extend({ Text3D })

interface Text3DComponentProps {
  text: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  opacity: number
  color: string
}

function Text3DComponent({ text, position, rotation, scale, opacity, color }: Text3DComponentProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.02
    }
  })

  return (
    <Center>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text3D
          ref={meshRef}
          font="/fonts/Geist_Bold.json"
          size={scale}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={position}
          rotation={rotation}
        >
          {text}
          <meshStandardMaterial
            color={color}
            transparent
            opacity={opacity}
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={1}
          />
        </Text3D>
      </Float>
    </Center>
  )
}

interface ScrollText3DProps {
  isVisible: boolean
  scrollProgress: number
}

function ScrollText3D({ isVisible, scrollProgress }: ScrollText3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return

    // Animate based on scroll progress
    const progress = Math.min(scrollProgress * 2, 1) // Speed up the animation

    // Position animation
    groupRef.current.position.z = -5 + progress * 8
    groupRef.current.rotation.x = (1 - progress) * 0.3
    groupRef.current.rotation.y = (1 - progress) * 0.2

    // Scale animation
    const scale = 0.5 + progress * 1.5
    groupRef.current.scale.setScalar(scale)
  })

  if (!isVisible) return null

  return (
    <group ref={groupRef}>
      <Text3DComponent text="ANAND" position={[0, 1, 0]} rotation={[0, 0, 0]} scale={2} opacity={0.8} color="#2563eb" />
      <Text3DComponent
        text="DEVELOPER"
        position={[0, -1, 0]}
        rotation={[0, 0, 0]}
        scale={1}
        opacity={0.6}
        color="#7c3aed"
      />
    </group>
  )
}

interface Section3DTransitionProps {
  sectionTitle: string
  isActive: boolean
  progress: number
}

function Section3DTransition({ sectionTitle, isActive, progress }: Section3DTransitionProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current || !isActive) return

    const time = state.clock.elapsedTime

    // Dynamic animations based on progress
    meshRef.current.rotation.y = progress * Math.PI * 2 + time * 0.1
    meshRef.current.position.y = Math.sin(progress * Math.PI) * 2
    meshRef.current.position.z = -2 + progress * 4

    // Scale pulsing
    const scale = 1 + Math.sin(time * 2) * 0.1
    meshRef.current.scale.setScalar(scale)
  })

  if (!isActive) return null

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="/fonts/Geist_Bold.json"
        size={1.5}
        height={0.4}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.03}
        bevelOffset={0}
        bevelSegments={8}
      >
        {sectionTitle}
        <meshStandardMaterial
          color="#f59e0b"
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </Text3D>
    </Center>
  )
}

interface ThreeDTextTransitionProps {
  currentSection: string
  scrollProgress: number
}

// Default export
export default function ThreeDTextTransition({ currentSection, scrollProgress }: ThreeDTextTransitionProps) {
  const [activeTransition, setActiveTransition] = useState<string | null>(null)
  const [showHeroText, setShowHeroText] = useState(true)

  const sectionTitles: Record<string, string> = {
    about: "ABOUT",
    experience: "EXPERIENCE",
    projects: "PROJECTS",
    contact: "CONTACT",
  }

  useEffect(() => {
    // Show section transition when changing sections
    if (currentSection !== "home" && sectionTitles[currentSection]) {
      setActiveTransition(currentSection)
      setShowHeroText(false)

      // Hide transition after animation
      const timer = setTimeout(() => {
        setActiveTransition(null)
      }, 2000)

      return () => clearTimeout(timer)
    } else if (currentSection === "home") {
      setShowHeroText(true)
      setActiveTransition(null)
    }
  }, [currentSection])

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
        }}
        style={{ background: "transparent" }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 0, 10]} intensity={0.8} color="#8b5cf6" />

        {/* Hero Text */}
        <ScrollText3D isVisible={showHeroText && currentSection === "home"} scrollProgress={scrollProgress} />

        {/* Section Transitions */}
        {Object.entries(sectionTitles).map(([section, title]) => (
          <Section3DTransition
            key={section}
            sectionTitle={title}
            isActive={activeTransition === section}
            progress={scrollProgress}
          />
        ))}

        {/* Environment effects */}
        <fog attach="fog" args={["#f8fafc", 15, 25]} />
      </Canvas>
    </div>
  )
}
