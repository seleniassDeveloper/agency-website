import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function SplitWord({ word, className = '' }) {
  return (
    <span className={`word ${className}`}>
      {word.split('').map((ch, i) => (
        <span key={i} className="char" style={{ display: 'inline-block' }}>
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef  = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 })

      tl.from('.hero-eyebrow', {
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
      })

      tl.from(titleRef.current.querySelectorAll('.char'), {
        y: '115%',
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.025,
      }, '-=0.5')

      tl.from(['.hero-sub', '.hero-cta'], {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.15,
      }, '-=0.4')

      tl.from('.hero-scroll', {
        opacity: 0, duration: 0.6,
      }, '-=0.3')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>

      <div className="container">
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-eyebrow">Consultoría y Desarrollo Digital</div>

          <h1 className="hero-title" ref={titleRef} style={{ fontSize: 'clamp(60px, 11vw, 170px)', width: '100%' }}>
            <div className="clip-wrap" style={{ display: 'block' }}>
              <SplitWord word="PRODUCTOS" />
            </div>
            <div className="clip-wrap" style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5%' }}>
              <SplitWord word="DIGITALES" className="accent" />
            </div>
          </h1>

          <div className="hero-bottom">
            <p className="hero-sub" style={{ maxWidth: '550px' }}>
              <strong>Transformamos ideas en páginas, apps y sistemas listos para crecer.</strong><br/>
              Desarrollamos soluciones web y mobile para emprendedores y negocios que necesitan lanzar, ordenar o escalar su presencia digital.
            </p>

            <a href="#contact" className="hero-cta" data-cursor>
              <span>Quiero crear mi proyecto</span>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
