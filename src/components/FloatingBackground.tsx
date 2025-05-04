'use client'
import React, { Suspense, useRef } from 'react'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Componente de cubos flutuantes animados
function FloatingCube(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const speed = Math.random() * 0.01 + 0.005

  // Função de animação que roda a cada frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta
      meshRef.current.position.y += speed
      if (meshRef.current.position.y > 2) {
        meshRef.current.position.y = -10
      }
    }
  })

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={`hsl(${Math.random() * 360}, 100%, 70%)`} />
    </mesh>
  )
}

// Função para renderizar os cubos flutuantes junto com o modelo GLTF
function FloatingCubes() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <FloatingCube
          key={i}
          position={[Math.random() * 10 - 5, -10, Math.random() * 10 - 5]}
        />
      ))}
    </>
  )
}

// Componente principal do fundo flutuante com o modelo 3D
export default function FloatingBackground() {
  return (
    <div className="absolute w-full h-full z-0">
      <Suspense fallback={<span>Loading...</span>}>
        <Canvas className="w-full h-full left-0 top-0">
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          <FloatingCubes />
        </Canvas>
      </Suspense>
    </div>
  )
}
