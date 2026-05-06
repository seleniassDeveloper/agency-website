import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Cursor from "./components/Cursor"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Process from "./components/Process"
import ProjectEstimator from "./components/ProjectEstimator"
import Work from "./components/Work"
import Footer from "./components/Footer"
import BackgroundBlob from "./components/BackgroundBlob"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Force scroll to top on page load so entrance animations are always seen
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    lenisRef.current = lenis

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <BackgroundBlob />
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Process />
        <ProjectEstimator />
        <Work />
      </main>

      <Footer />
    </>
  )
}