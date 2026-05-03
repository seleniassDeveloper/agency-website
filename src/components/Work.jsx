import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    name: 'Landing Pages',
    desc: 'Páginas diseñadas para captar atención y convertir visitantes en clientes de forma rápida y efectiva.',
    tags: ['Conversión', 'Ventas', 'Diseño'],
    stats: [{ num: 'Rápido', label: 'Desarrollo' }, { num: 'Alto', label: 'Impacto' }],
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80',
  },
  {
    id: '02',
    name: 'Sitios Web',
    desc: 'Tu presencia oficial en internet. Sitios institucionales profesionales, rápidos y optimizados para destacar tu marca.',
    tags: ['Institucional', 'SEO', 'Presencia'],
    stats: [{ num: '100%', label: 'Personalizado' }, { num: 'Óptimo', label: 'Rendimiento' }],
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80',
  },
  {
    id: '03',
    name: 'Web Apps',
    desc: 'Aplicaciones completas y plataformas de venta con lógica compleja, bases de datos y experiencia fluida.',
    tags: ['SaaS', 'Plataformas', 'E-commerce'],
    stats: [{ num: 'UX', label: 'Priorizado' }, { num: 'Cloud', label: 'Escalable' }],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
  {
    id: '04',
    name: 'Sistemas Internos',
    desc: 'Herramientas a medida para gestionar tu negocio, automatizar procesos y visualizar datos en tiempo real.',
    tags: ['Gestión', 'Datos', 'Automatización'],
    stats: [{ num: 'Control', label: 'Total' }, { num: 'Eficiencia', label: 'Mejorada' }],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80',
  }
]

export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current.querySelectorAll('.section-label, .section-title'), {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      })

      let mm = gsap.matchMedia();

      // Desktop: Horizontal Scroll
      mm.add("(min-width: 901px)", () => {
        let panels = gsap.utils.toArray('.work-panel')
        
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + trackRef.current.scrollWidth
          }
        })
      });

      // Mobile: Vertical Scroll Fade-ins
      mm.add("(max-width: 900px)", () => {
        gsap.utils.toArray('.work-panel').forEach(panel => {
          gsap.from(panel, {
            y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%'
            }
          })
        });
      });

    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section className="work-section-v2" id="work" ref={sectionRef}>
      <div className="work-header" ref={headerRef}>
        <div className="section-label">Qué construyo</div>
        <h2 className="section-title">Soluciones Digitales</h2>
      </div>

      <div className="work-scroll-container">
        <div className="work-scroll-track" ref={trackRef}>
          {PROJECTS.map((p) => (
            <article className="work-panel" key={p.id}>
              <div className="work-panel-inner">
                <div className="work-panel-img-wrap">
                  <img src={p.img} alt={p.name} loading="lazy" className="project-img" />
                </div>
                <div className="work-panel-info">
                  <div className="project-number">{p.id}</div>
                  <h3 className="project-info-title">{p.name}</h3>
                  <p className="project-info-desc">{p.desc}</p>
                  
                  <div className="project-info-stats">
                    {p.stats.map(s => (
                      <div key={s.label}>
                        <div className="stat-num">{s.num}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="project-tags" style={{ marginTop: 24 }}>
                    {p.tags.map(t => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
