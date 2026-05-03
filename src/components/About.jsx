import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { num: '100%',  label: 'Soluciones reales' },
  { num: 'UX+',   label: 'Lógica sólida' },
  { num: '∞',     label: 'Escalabilidad' },
  { num: '0',     label: 'Código requerido por vos' },
]

const LETTERS = ['V', 'A', 'L', 'O', 'R']

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-letter', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: '100%', opacity: 0,
        duration: 1.0, ease: 'power4.out',
        stagger: 0.06,
      })
      gsap.from('.about-text', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.3,
      })
      gsap.from('.about-stat-num', {
        scrollTrigger: { trigger: '.about-stats', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="about-grid">
        <div>
          <div className="about-stacked-title">
            {LETTERS.map((l, i) => (
              <span key={i} className={`letter${i % 2 !== 0 ? ' accent-letter' : ''}`}
                style={{ overflow: 'hidden', display: 'block' }}>
                <span className="about-letter" style={{ display: 'block' }}>{l}</span>
              </span>
            ))}
          </div>
          <div className="about-stats">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel about-content-panel">
          <h3 className="about-heading">
            No necesitás saber programar,<br/> <span className="text-gradient">solo necesitás una idea.</span>
          </h3>
          
          <ul className="about-checklist">
            <li>
              <div className="check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Tenés una idea pero no sabés por dónde empezar.</span>
            </li>
            <li>
              <div className="check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Necesitás digitalizar tu negocio de forma profesional.</span>
            </li>
            <li>
              <div className="check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Querés vender mejor y escalar online.</span>
            </li>
          </ul>

          <div className="about-highlight">
            Nos encargamos de transformar esa necesidad en un sistema que funcione y genere resultados.
          </div>

          <p className="about-subtext">
            No construimos solo diseños bonitos, construimos <strong>productos reales</strong>. Nos enfocamos en combinar una excelente experiencia de usuario (UX) con lógica robusta y arquitectura escalable para que tu idea se convierta en una plataforma lista para crecer.
          </p>
        </div>
      </div>
    </section>
  )
}
