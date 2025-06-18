"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useLenis } from "lenis/react"
import type * as THREE from "three"

// 3D Computer Model Component
function Computer3D() {
  const groupRef = useRef<THREE.Group>(null)
  const lenis = useLenis()

  useFrame(() => {
    if (!groupRef.current || !lenis) return

    const scrollProgress = lenis.scroll / lenis.limit
    const time = Date.now() * 0.001

    // Animate based on scroll
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2 + time * 0.1
    groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2
    groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 2) * 0.5
    groupRef.current.scale.setScalar(0.8 + Math.sin(scrollProgress * Math.PI) * 0.2)
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Monitor/Screen */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.2, 1.8, 0.3]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>

      {/* Screen (dark area) */}
      <mesh position={[0, 1.3, 0.16]}>
        <boxGeometry args={[1.8, 1.4, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Computer Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.5, 1.8]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>

      {/* Floppy Disk Slot */}
      <mesh position={[0.8, 0.2, 0.91]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Apple Logo Area */}
      <mesh position={[-0.6, 0.3, 0.91]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      <mesh position={[-0.5, 0.3, 0.91]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      <mesh position={[-0.4, 0.3, 0.91]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#45b7d1" />
      </mesh>

      {/* Ventilation Grilles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[1.1, -0.4 + i * 0.1, 0.91]}>
          <boxGeometry args={[0.15, 0.02, 0.01]} />
          <meshStandardMaterial color="#d0d0d0" />
        </mesh>
      ))}

      {/* Power Button */}
      <mesh position={[0, -0.6, 0.91]}>
        <cylinderGeometry args={[0.06, 0.06, 0.03]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  )
}

// Floating Particles Component
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const lenis = useLenis()

  useFrame(() => {
    if (!particlesRef.current || !lenis) return

    const scrollProgress = lenis.scroll / lenis.limit
    particlesRef.current.rotation.y = scrollProgress * Math.PI * 0.5
    particlesRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.3
  })

  // Create particle positions
  const particleCount = 50
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a8a29e" size={0.02} sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

// Main 3D Scene Component
export function RetroComputer3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      <Canvas
        camera={{
          position: [4, 2, 6],
          fov: 60,
        }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#f5f5dc" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffd700" />

        {/* 3D Computer */}
        <Computer3D />

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Environment */}
        <fog attach="fog" args={["#f5f5f4", 8, 20]} />
      </Canvas>
    </div>
  )
}
