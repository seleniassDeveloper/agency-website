import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TITLE = "¿CÓMO PODEMOS AYUDARTE?"

export default function Contact() {
  const sectionRef = useRef(null)
  const [activeType, setActiveType] = useState('Sitio Web')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-eyebrow', {
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-eyebrow', start: 'top 82%' },
      })

      gsap.from('.contact-title .line', {
        y: '105%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.contact-title', start: 'top 80%' },
      })

      gsap.from('.buzz-form', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.buzz-form', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-bg" />

      <p className="contact-eyebrow">Tu idea puede convertirse en un producto real.</p>

      <h2 className="contact-title" style={{ fontSize: 'clamp(40px, 6vw, 90px)', marginBottom: '60px' }}>
        <span className="clip-wrap" style={{ display: 'block' }}>
          <span className="line" style={{ display: 'block' }}>{TITLE}</span>
        </span>
      </h2>

      <form className="buzz-form" onSubmit={(e) => { e.preventDefault(); window.location.href = 'mailto:hola@agencia.com'; }}>
        <div className="buzz-pills">
          {['Sitio Web', 'Web App', 'Sistema Interno'].map(type => (
            <button
              key={type}
              type="button"
              className={`buzz-pill ${activeType === type ? 'active' : ''}`}
              onClick={() => setActiveType(type)}
            >
              <span className="buzz-pill-dot" />
              {type}
            </button>
          ))}
        </div>

        <div className="buzz-dynamic-fields" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="buzz-input-group">
            <input type="text" className="buzz-input" placeholder="TU NOMBRE" required />
          </div>
          
          <div className="buzz-input-group">
            <input type="email" className="buzz-input" placeholder="TU EMAIL" required />
          </div>
          
          <div className="buzz-input-group">
            <textarea 
              className="buzz-input" 
              placeholder={
                activeType === 'Sitio Web' ? 'CONTAME SOBRE TU NEGOCIO...' :
                activeType === 'Web App' ? 'CONTAME SOBRE TU IDEA PARA LA APP...' :
                '¿QUÉ PROCESO QUERÉS OPTIMIZAR?'
              } 
              rows="1"
              required 
            />
          </div>
        </div>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="buzz-submit" data-cursor>
            ENVIAR MENSAJE
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </section>
  )
}
