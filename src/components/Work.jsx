import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const headerRef = useRef(null)
  const { t } = useTranslation()

  const PROJECTS = [
    { id: '01', ...t('work.p1', { returnObjects: true }), img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80' },
    { id: '02', ...t('work.p2', { returnObjects: true }), img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80' },
    { id: '03', ...t('work.p3', { returnObjects: true }), img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
    { id: '04', ...t('work.p4', { returnObjects: true }), img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80' }
  ]

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
        <div className="section-label">{t('work.label')}</div>
        <h2 className="section-title">{t('work.title')}</h2>
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
                    {p.stats && p.stats.length >= 4 && (
                      <>
                        <div>
                          <div className="stat-num">{p.stats[0]}</div>
                          <div className="stat-label">{p.stats[1]}</div>
                        </div>
                        <div>
                          <div className="stat-num">{p.stats[2]}</div>
                          <div className="stat-label">{p.stats[3]}</div>
                        </div>
                      </>
                    )}
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
