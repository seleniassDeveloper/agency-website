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
    const ctx = gsap.context(() => {
      gsap.from('.process-label, .process-title', {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.process-step', {
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.process-steps', start: 'top 78%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        padding: 'var(--section-gap) var(--pad-x)',
        borderTop: '1px solid var(--bg-line)',
      }}
    >
      <div style={{ marginBottom: 'clamp(40px, 6vw, 80px)', textAlign: 'center' }}>
        <div className="section-label process-label" style={{ display: 'inline-block' }}>Metodología</div>
        <h2 className="section-title process-title" style={{ textAlign: 'center' }}>Nuestro Proceso</h2>
      </div>

      <div
        className="process-steps"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="process-step glass-panel"
            style={{ 
              display: 'flex', 
              flexDirection: 'row',
              gap: 'clamp(20px, 5vw, 60px)', 
              alignItems: 'flex-start',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                color: 'var(--cyan)',
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {step.num}
            </div>

            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  marginBottom: '12px',
                  color: 'var(--text)',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: 'var(--text-mid)',
                  maxWidth: '600px',
                }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
