import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'

export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const loopRef = useRef(null)
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0) // Default to first project

  const PROJECTS = [
    { id: '01', ...t('work.p1', { returnObjects: true }), img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    { id: '02', ...t('work.p2', { returnObjects: true }), img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' },
    { id: '03', ...t('work.p3', { returnObjects: true }), img: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800' },
    { id: '04', ...t('work.p4', { returnObjects: true }), img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800' }
  ]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Positioning the first project immediately
    const panels = track.querySelectorAll('.work-panel')
    const firstPanel = panels[0]
    if (firstPanel && activeTab === 0) {
      const offset = firstPanel.offsetLeft - (window.innerWidth / 2) + (firstPanel.offsetWidth / 2)
      const clampedX = -Math.max(0, Math.min(offset, track.scrollWidth - window.innerWidth))
      gsap.set(track, { x: clampedX })
    }

    // Autoplay loop setup
    const totalWidth = track.scrollWidth
    const duration = 40
    
    const loop = gsap.to(track, {
      x: () => -(totalWidth - window.innerWidth),
      duration: duration,
      ease: 'none',
      repeat: -1,
      yoyo: true,
      paused: activeTab !== -1 // Start paused if we have an active tab
    })

    loopRef.current = loop

    const onEnter = () => loop.pause()
    const onLeave = () => {
      if (activeTab === -1) loop.play()
    }

    track.addEventListener('mouseenter', onEnter)
    track.addEventListener('mouseleave', onLeave)

    return () => {
      loop.kill()
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const goToProject = (index) => {
    setActiveTab(index)
    if (loopRef.current) loopRef.current.pause()
    
    const track = trackRef.current
    const panels = track.querySelectorAll('.work-panel')
    const targetPanel = panels[index]
    
    if (!targetPanel) return

    const offset = targetPanel.offsetLeft - (window.innerWidth / 2) + (targetPanel.offsetWidth / 2)
    const minX = -(track.scrollWidth - window.innerWidth)
    const clampedX = Math.max(minX, Math.min(0, -offset))

    gsap.to(track, {
      x: clampedX,
      duration: 1,
      ease: 'expo.out' // Faster, sharper positioning
    })
  }

  const resumeAutoplay = () => {
    setActiveTab(-1)
    if (loopRef.current) loopRef.current.play()
  }

  return (
    <section className="work-section-v2" id="work" ref={sectionRef}>
      <div className="work-header">
        <div className="section-label">{t('work.label')}</div>
        <h2 className="section-title">{t('work.title')}</h2>
        
        <div className="work-nav-wrapper">
          <div className="work-nav-pills">
            {PROJECTS.map((p, i) => (
              <button 
                key={p.id} 
                className={`work-pill ${activeTab === i ? 'active' : ''}`}
                onClick={() => goToProject(i)}
              >
                {p.name}
              </button>
            ))}
          </div>
          <button className={`work-resume-btn ${activeTab === -1 ? 'running' : ''}`} onClick={resumeAutoplay}>
            <span>{activeTab === -1 ? '⏸' : '▶'}</span> 
            {activeTab === -1 ? 'Autoplay Active' : 'Resume Autoplay'}
          </button>
        </div>
      </div>

      <div className="work-scroll-container">
        <div className="work-scroll-track" ref={trackRef}>
          {PROJECTS.map((p, i) => (
            <article key={p.id} className={`work-panel ${activeTab === i ? 'active' : ''}`}>
              <div className="work-panel-inner glass-panel">
                <div className="work-panel-content">
                  <div className="work-panel-num">{p.id}</div>
                  <h3 className="work-panel-title">{p.name}</h3>
                  <p className="work-panel-desc">{p.desc}</p>
                  
                  <div className="work-panel-stats">
                    {p.stats && p.stats.length >= 2 && (
                      <div className="work-stat">
                        <div className="stat-value">{p.stats[0]}</div>
                        <div className="stat-label">DESARROLLO</div>
                      </div>
                    )}
                    {p.stats && p.stats.length >= 4 && (
                      <div className="work-stat">
                        <div className="stat-value">{p.stats[2]}</div>
                        <div className="stat-label">IMPACTO</div>
                      </div>
                    )}
                  </div>

                  <div className="work-panel-tags">
                    {p.tags.map(tag => (
                      <span key={tag} className="work-tag">{tag}</span>
                    ))}
                  </div>

                  <a href="#estimator" className="work-card-cta">
                    {t('hero.cta')}
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
                    </svg>
                  </a>
                </div>
                
                <div className="work-panel-visual">
                  <div className="project-img-container">
                    <img src={p.img} alt={p.name} className="project-img" />
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
