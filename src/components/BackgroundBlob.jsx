import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, Environment } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Blob() {
  const meshRef = useRef()
  const materialRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!meshRef.current || !materialRef.current) return;

      const proxy = { distort: 0.4, speed: 1.5 }

      // Transition 1: Hero to Work
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#work",
          start: "top 95%",
          end: "top 5%",
          scrub: 1,
        }
      })
      
      tl1.to(meshRef.current.scale, { x: 14, y: 14, z: 14, duration: 1, ease: "power2.in" }, 0)
         .to(proxy, { 
            distort: 1.5, speed: 4, duration: 1, ease: "power2.in",
            onUpdate: () => {
              materialRef.current.distort = proxy.distort
              materialRef.current.speed = proxy.speed
            }
         }, 0)
         .to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1, ease: "power2.out" }, 1)
         .to(proxy, { 
            distort: 0.4, speed: 1.5, duration: 1, ease: "power2.out",
            onUpdate: () => {
              materialRef.current.distort = proxy.distort
              materialRef.current.speed = proxy.speed
            }
         }, 1)

      // Transition 2: Work to About
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 95%",
          end: "top 5%",
          scrub: 1,
        }
      })
      
      tl2.to(meshRef.current.scale, { x: 14, y: 14, z: 14, duration: 1, ease: "power2.in" }, 0)
         .to(proxy, { 
            distort: 1.5, speed: 4, duration: 1, ease: "power2.in",
            onUpdate: () => {
              materialRef.current.distort = proxy.distort
              materialRef.current.speed = proxy.speed
            }
         }, 0)
         .to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1, ease: "power2.out" }, 1)
         .to(proxy, { 
            distort: 0.4, speed: 1.5, duration: 1, ease: "power2.out",
            onUpdate: () => {
              materialRef.current.distort = proxy.distort
              materialRef.current.speed = proxy.speed
            }
         }, 1)
    })
    
    return () => ctx.revert()
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t / 4)
      meshRef.current.rotation.z = Math.cos(t / 4)
      meshRef.current.position.y = Math.sin(t / 2) * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#2a0066"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={2}
      />
    </Sphere>
  )
}

export default function BackgroundBlob() {
  return (
    <div className="background-canvas-container">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4b0082" />
        <Environment preset="city" />
        <Blob />
      </Canvas>
    </div>
  )
}
