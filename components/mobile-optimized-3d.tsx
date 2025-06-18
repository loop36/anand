"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useLenis } from "lenis/react"
import type * as THREE from "three"

function SimpleComputer() {
  const computerRef = useRef<THREE.Group>(null)
  const lenis = useLenis()

  useFrame(() => {
    if (!computerRef.current || !lenis) return

    const scrollProgress = lenis.scroll / lenis.limit

    // Simplified animations for better mobile performance
    computerRef.current.rotation.y = scrollProgress * Math.PI + Date.now() * 0.0001
    computerRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.5
    computerRef.current.scale.setScalar(0.7 + Math.sin(scrollProgress * Math.PI) * 0.1)
  })

  return (
    <group ref={computerRef}>
      {/* Simplified computer model */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 1.5]} />
        <meshBasicMaterial color="#f5f5dc" />
      </mesh>

      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2, 1.6, 0.2]} />
        <meshBasicMaterial color="#f0f0e8" />
      </mesh>

      <mesh position={[0, 1.3, 0.11]}>
        <boxGeometry args={[1.6, 1.2, 0.02]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
    </group>
  )
}

export function MobileOptimized3D() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-5 opacity-60">
        <Canvas
          camera={{ position: [4, 2, 5], fov: 60 }}
          style={{ background: "transparent" }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.5} />
          <SimpleComputer />
        </Canvas>
      </div>
    )
  }

  return null
}
