import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Entendemos tu idea',
    desc: 'Escuchamos tu visión, objetivos y los problemas que buscás resolver para alinearnos al 100%.',
  },
  {
    num: '02',
    title: 'Definimos estructura',
    desc: 'Mapeamos qué hace falta y priorizamos las funcionalidades clave para garantizar el éxito.',
  },
  {
    num: '03',
    title: 'Diseñamos experiencia',
    desc: 'Creamos interfaces intuitivas (UX/UI) pensadas exclusivamente para la conversión.',
  },
  {
    num: '04',
    title: 'Desarrollamos',
    desc: 'Escribimos código rápido y escalable. Transformamos el diseño aprobado en un producto 100% funcional.',
  },
  {
    num: '05',
    title: 'Lanzamos y mejoramos',
    desc: 'Ponemos el producto online y lo optimizamos basándonos en datos y feedback de usuarios reales.',
  },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.process-sticky-content', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      // Setup ScrollTrigger for each step
      const steps = gsap.utils.toArray('.process-step-v2')
      
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 60%',    // When the top of the step hits 60% down the viewport
          end: 'bottom 40%',   // When the bottom of the step hits 40% down the viewport
          toggleClass: 'active', // Add active class to highlight it
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="process-section-v2">
      <div className="process-grid-v2">
        {/* Left Column - Sticky */}
        <div className="process-left">
          <div className="process-sticky-content">
            <div className="section-label process-label">Metodología</div>
            <h2 className="section-title process-title" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.1 }}>
              Nuestro<br/>Proceso
            </h2>
          </div>
        </div>

        {/* Right Column - Scrolling */}
        <div className="process-right">
          {STEPS.map((step) => (
            <div key={step.num} className="process-step-v2">
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
