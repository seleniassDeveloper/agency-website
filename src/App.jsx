import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"

import Cursor from "./components/Cursor"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Process from "./components/Process"
import Work from "./components/Work"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import BackgroundBlob from "./components/BackgroundBlob"

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

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
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
        {/* <Work /> */}
        <Contact />
      </main>

      <Footer />
    </>
  )
}