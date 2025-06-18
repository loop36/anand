"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, Center, Float, Environment } from "@react-three/drei"
import type * as THREE from "three"

function Hero3DText() {
  const groupRef = useRef<THREE.Group>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Mouse parallax effect
    groupRef.current.rotation.y = mousePosition.x * 0.1
    groupRef.current.rotation.x = -mousePosition.y * 0.1

    // Floating animation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.2
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <group ref={groupRef}>
      <Center>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Text3D
            font="/fonts/Geist_Bold.json"
            size={3}
            height={0.5}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.05}
            bevelSize={0.05}
            bevelOffset={0}
            bevelSegments={8}
            position={[0, 1, 0]}
          >
            ANAND
            <meshStandardMaterial
              color="#3b82f6"
              transparent
              opacity={0.9}
              roughness={0.1}
              metalness={0.8}
              envMapIntensity={2}
            />
          </Text3D>
        </Float>
      </Center>

      <Center>
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <Text3D
            font="/fonts/Geist_Regular.json"
            size={1.2}
            height={0.2}
            curveSegments={8}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[0, -1.5, 0]}
          >
            DEVELOPER
            <meshStandardMaterial
              color="#8b5cf6"
              transparent
              opacity={0.7}
              roughness={0.2}
              metalness={0.6}
              envMapIntensity={1.5}
            />
          </Text3D>
        </Float>
      </Center>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[Math.random() * 20 - 10, Math.random() * 10 - 5, Math.random() * 10 - 5]}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
              transparent
              opacity={0.6}
              emissive={i % 2 === 0 ? "#1e40af" : "#6d28d9"}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Default export
export default function EnhancedHero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 12],
          fov: 75,
        }}
        style={{ background: "transparent" }}
      >
        {/* Advanced Lighting Setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[0, 0, 10]} intensity={1} color="#8b5cf6" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#f59e0b" angle={0.3} penumbra={1} />

        {/* Environment for reflections */}
        <Environment preset="city" />

        <Hero3DText />

        {/* Atmospheric fog */}
        <fog attach="fog" args={["#f8fafc", 20, 35]} />
      </Canvas>
    </div>
  )
}
