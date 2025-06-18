"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useLenis } from "lenis/react"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

function AnimatedComputer() {
  const computerRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const lenis = useLenis()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      const progress = lenis.scroll / lenis.limit
      setScrollProgress(progress)
    }

    lenis.on("scroll", handleScroll)
    return () => lenis.off("scroll", handleScroll)
  }, [lenis])

  useFrame((state) => {
    if (!computerRef.current || !screenRef.current) return

    const time = state.clock.elapsedTime

    // Main computer animations based on scroll
    computerRef.current.rotation.y = scrollProgress * Math.PI * 3 + time * 0.05
    computerRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.15
    computerRef.current.rotation.z = Math.cos(scrollProgress * Math.PI * 1.5) * 0.1

    // Position changes
    computerRef.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 1.5
    computerRef.current.position.y = Math.cos(scrollProgress * Math.PI * 1.5) * 0.8
    computerRef.current.position.z = Math.sin(scrollProgress * Math.PI) * 0.5

    // Scale pulsing
    const scale = 0.6 + Math.sin(scrollProgress * Math.PI * 4) * 0.2 + Math.sin(time * 2) * 0.05
    computerRef.current.scale.setScalar(scale)

    // Screen glow effect
    const screenMaterial = screenRef.current.material as THREE.MeshStandardMaterial
    screenMaterial.emissive.setHSL(0.6, 0.5, 0.1 + Math.sin(time * 3) * 0.05)
  })

  return (
    <group ref={computerRef}>
      {/* Main Computer Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.6, 1.8]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Monitor */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[2.2, 1.8, 0.3]} />
        <meshStandardMaterial color="#f0f0e8" roughness={0.6} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 1.4, 0.16]}>
        <boxGeometry args={[1.8, 1.4, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" emissive="#001122" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Screen Content Simulation */}
      <Text
        position={[0, 1.4, 0.17]}
        fontSize={0.08}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {"ANAND.DEV\n> LOADING..."}
      </Text>

      {/* Floppy Drive */}
      <mesh position={[0.8, 0.2, 0.91]}>
        <boxGeometry args={[0.35, 0.08, 0.03]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Rainbow Apple Logo */}
      <group position={[-0.5, 0.3, 0.91]}>
        <mesh position={[-0.1, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02]} />
          <meshStandardMaterial color="#ff4757" emissive="#ff4757" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02]} />
          <meshStandardMaterial color="#ffa502" emissive="#ffa502" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02]} />
          <meshStandardMaterial color="#2ed573" emissive="#2ed573" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Ventilation Grilles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[1.1, -0.5 + i * 0.1, 0.91]}>
          <boxGeometry args={[0.18, 0.02, 0.01]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>
      ))}

      {/* Power LED */}
      <mesh position={[0, -0.6, 0.91]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function OrbitingElements() {
  const groupRef = useRef<THREE.Group>(null)
  const lenis = useLenis()

  useFrame((state) => {
    if (!groupRef.current || !lenis) return

    const scrollProgress = lenis.scroll / lenis.limit
    const time = state.clock.elapsedTime

    groupRef.current.rotation.y = time * 0.2 + scrollProgress * Math.PI
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Orbiting geometric shapes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 4
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle * 0.5) * 2, Math.sin(angle) * radius]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#a8a29e" transparent opacity={0.3} />
          </mesh>
        )
      })}
    </group>
  )
}

export function ScrollResponsive3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 opacity-80">
      <Canvas
        camera={{
          position: [5, 3, 7],
          fov: 50,
        }}
        shadows
        style={{ background: "transparent" }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} color="#f5f5f4" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 5, 0]} intensity={0.4} color="#ffd700" />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#4ecdc4" />

        {/* Main 3D Computer */}
        <AnimatedComputer />

        {/* Orbiting Elements */}
        <OrbitingElements />

        {/* Atmospheric fog */}
        <fog attach="fog" args={["#f5f5f4", 10, 25]} />
      </Canvas>
    </div>
  )
}
