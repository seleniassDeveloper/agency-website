import { useRef, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, Environment } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// THE MAIN LIQUID BLOB
function Blob() {
  const meshRef = useRef()
  const materialRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!meshRef.current || !materialRef.current) return;

      const proxy = { distort: 0.4, speed: 1.5, spread: 1, envIntensity: 2 }
      const updateMaterial = (p) => {
        if (materialRef.current) {
          materialRef.current.distort = p.distort
          materialRef.current.speed = p.speed
          materialRef.current.envMapIntensity = p.envIntensity
        }
      }

      // GSAP Animations
      // We will move the blob strategically to balance the layout of each section.
      
      // Hero (Text is Left -> Blob starts Right)
      gsap.set(document.body, { backgroundColor: "#050505" })
      
      // Entrance Animation (Molecule drops from above)
      gsap.fromTo(meshRef.current.position, 
        { x: 1.8, y: 3 }, 
        { x: 1.8, y: 0, duration: 2, ease: "power4.out", delay: 0.2 }
      )
      gsap.fromTo(meshRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1.5, y: 1.5, z: 1.5, duration: 2, ease: "power3.out", delay: 0.2 }
      )

      // Transition 1: Hero to Work
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#work",
          start: "top 100%",
          end: "top 0%",
          scrub: 1,
        }
      })
      
      tl1.to(document.body, { backgroundColor: "#1a0b2e", duration: 1 }, 0)
         .to(meshRef.current.position, { x: 0, y: -0.5, duration: 1, ease: "sine.inOut" }, 0)
         .to(meshRef.current.scale, { x: 12, y: 12, z: 12, duration: 1, ease: "sine.in" }, 0)
         .to(proxy, { distort: 0.8, speed: 4, spread: 1.5, duration: 1, ease: "sine.in", onUpdate: () => updateMaterial(proxy) }, 0)
         .to(meshRef.current.scale, { x: 2, y: 2, z: 2, duration: 1, ease: "sine.out" }, 1)
         .to(proxy, { distort: 0.5, speed: 1.5, spread: 1, duration: 1, ease: "sine.out", onUpdate: () => updateMaterial(proxy) }, 1)

      // Transition 2: Work to About
      const tl2 = gsap.timeline({
        scrollTrigger: { trigger: "#about", start: "top 100%", end: "top 0%", scrub: 1 }
      })
      
      tl2.to(document.body, { backgroundColor: "#00151a", duration: 1 }, 0)
         .to(meshRef.current.position, { x: -2.5, y: 0, duration: 1, ease: "sine.inOut" }, 0)
         .to(meshRef.current.scale, { x: 12, y: 12, z: 12, duration: 1, ease: "sine.in" }, 0)
         .to(proxy, { distort: 0.8, speed: 4, spread: 3, envIntensity: 0.5, duration: 1, ease: "sine.in", onUpdate: () => updateMaterial(proxy) }, 0)
         .to(meshRef.current.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 1, ease: "sine.out" }, 1)
         .to(proxy, { distort: 0.3, speed: 1, spread: 2.5, envIntensity: 0.8, duration: 1, ease: "sine.out", onUpdate: () => updateMaterial(proxy) }, 1)

      // Transition 3: About to Process
      const tl3 = gsap.timeline({
        scrollTrigger: { trigger: "#process", start: "top 100%", end: "top 0%", scrub: 1 }
      })
      
      tl3.to(document.body, { backgroundColor: "#000000", duration: 1 }, 0)
         .to(meshRef.current.position, { x: 2.5, y: -0.5, duration: 1, ease: "sine.inOut" }, 0)
         .to(meshRef.current.scale, { x: 12, y: 12, z: 12, duration: 1, ease: "sine.in" }, 0)
         .to(proxy, { distort: 0.8, speed: 4, spread: 1, envIntensity: 0.2, duration: 1, ease: "sine.in", onUpdate: () => updateMaterial(proxy) }, 0)
         .to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1, ease: "sine.out" }, 1)
         .to(proxy, { distort: 0.4, speed: 1.5, spread: 0.8, envIntensity: 0.5, duration: 1, ease: "sine.out", onUpdate: () => updateMaterial(proxy) }, 1)

      // Transition 4: Process to Contact
      const tl4 = gsap.timeline({
        scrollTrigger: { trigger: "#contact", start: "top 100%", end: "top 0%", scrub: 1 }
      })
      
      tl4.to(document.body, { backgroundColor: "#120524", duration: 1 }, 0)
         .to(meshRef.current.position, { x: 0, y: -1, duration: 1, ease: "sine.inOut" }, 0)
         .to(meshRef.current.scale, { x: 12, y: 12, z: 12, duration: 1, ease: "sine.in" }, 0)
         .to(proxy, { distort: 0.8, speed: 4, spread: 1.5, envIntensity: 2, duration: 1, ease: "sine.in", onUpdate: () => updateMaterial(proxy) }, 0)
         .to(meshRef.current.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 1, ease: "sine.out" }, 1)
         .to(proxy, { distort: 0.6, speed: 2, spread: 1.2, envIntensity: 2, duration: 1, ease: "sine.out", onUpdate: () => updateMaterial(proxy) }, 1)

      // Store proxy so useFrame can access it
      meshRef.current.userData.proxy = proxy

    })
    
    return () => ctx.revert()
  }, [])

  const nodesRef = useRef([])
  const basePositions = useMemo(() => [
    [0.7, 0.4, 0.2],
    [-0.6, -0.5, 0.4],
    [0.2, 0.8, -0.5],
    [-0.3, 0.1, -0.8],
    [0.5, -0.7, -0.3]
  ], [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t / 4) + t / 5
      meshRef.current.rotation.z = Math.cos(t / 4)
      meshRef.current.rotation.x = t / 6

      // Update molecule spread
      const proxy = meshRef.current.userData.proxy
      if (proxy) {
        nodesRef.current.forEach((node, i) => {
          if (node) {
            node.position.set(
              basePositions[i][0] * proxy.spread,
              basePositions[i][1] * proxy.spread,
              basePositions[i][2] * proxy.spread
            )
          }
        })
      }
    }
  })

  const moleculeMaterial = (
    <MeshDistortMaterial
      ref={materialRef}
      color="#2a0066"
      distort={0.5}
      speed={2.5}
      roughness={0.1}
      metalness={0.8}
      clearcoat={1}
      clearcoatRoughness={0.1}
      envMapIntensity={2}
    />
  )

  return (
    <group ref={meshRef} scale={1.5}>
      {/* Core */}
      <Sphere args={[0.8, 64, 64]} position={[0, 0, 0]}>
        {moleculeMaterial}
      </Sphere>
      
      {/* Attached Atoms/Nodes */}
      <Sphere ref={el => nodesRef.current[0] = el} args={[0.45, 32, 32]} position={basePositions[0]}>
        {moleculeMaterial}
      </Sphere>
      <Sphere ref={el => nodesRef.current[1] = el} args={[0.55, 32, 32]} position={basePositions[1]}>
        {moleculeMaterial}
      </Sphere>
      <Sphere ref={el => nodesRef.current[2] = el} args={[0.35, 32, 32]} position={basePositions[2]}>
        {moleculeMaterial}
      </Sphere>
      <Sphere ref={el => nodesRef.current[3] = el} args={[0.5, 32, 32]} position={basePositions[3]}>
        {moleculeMaterial}
      </Sphere>
      <Sphere ref={el => nodesRef.current[4] = el} args={[0.3, 32, 32]} position={basePositions[4]}>
        {moleculeMaterial}
      </Sphere>
    </group>
  )
}

// THE EXPLODING DROPLETS
function DropletsBurst() {
  const meshRef = useRef()
  const COUNT = 100 // Number of droplets
  
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < COUNT; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const x = Math.sin(phi) * Math.cos(theta)
      const y = Math.sin(phi) * Math.sin(theta)
      const z = Math.cos(phi)
      
      const speed = 2 + Math.random() * 5 // Speed/Distance multiplier
      const scale = 0.02 + Math.random() * 0.15 // Random droplet sizes
      
      temp.push({ x, y, z, speed, scale })
    }
    return temp
  }, [])

  useEffect(() => {
    // Initial invisible state
    for (let i = 0; i < COUNT; i++) {
      dummy.position.set(0, 0, 0)
      dummy.scale.set(0, 0, 0)
      dummy.updateMatrix()
      if (meshRef.current) meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true
  }, [dummy])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!meshRef.current) return;
      
      const proxy = { progress: 0 }
      const sections = ["#work", "#about", "#process", "#contact"]
      
      const updateInstancedMesh = () => {
        const p = proxy.progress
        // Creates a parabolic curve: 0 -> 1 -> 0 based on progress
        let burst = p < 0.5 ? p * 2 : (1 - p) * 2
        // Easing for more explosive feel
        burst = Math.pow(burst, 0.7)
        
        for (let i = 0; i < COUNT; i++) {
          const dir = particles[i]
          const dist = burst * dir.speed * 4
          dummy.position.set(dir.x * dist, dir.y * dist, dir.z * dist)
          
          dummy.rotation.x = dist
          dummy.rotation.y = dist
          
          const s = dir.scale * burst
          dummy.scale.set(s, s, s)
          dummy.updateMatrix()
          meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
      }

      sections.forEach(section => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "top 5%",
            scrub: 1,
          }
        })
        tl.to(proxy, { progress: 1, duration: 2, ease: "none", onUpdate: updateInstancedMesh }, 0)
      })

    })
    return () => ctx.revert()
  }, [dummy, particles])

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
      <sphereGeometry args={[1, 16, 16]} />
      <MeshDistortMaterial
        color="#00ffff"
        distort={0.4}
        speed={4}
        roughness={0.1}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </instancedMesh>
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
        <DropletsBurst />
      </Canvas>
    </div>
  )
}
