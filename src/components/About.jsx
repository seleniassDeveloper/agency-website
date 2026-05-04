import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

const LETTERS = ['V', 'A', 'L', 'O', 'R']

export default function About() {
  const ref = useRef(null)
  const { t } = useTranslation()

  const STATS = [
    { num: t('about.title1'),  label: t('about.desc1') },
    { num: t('about.title2'),   label: t('about.desc2') },
    { num: t('about.title3'),     label: t('about.desc3') },
    { num: t('about.title4'),     label: t('about.desc4') },
  ]

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
            {t('about.label').split('').map((l, i) => (
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
          <h3 className="about-heading" dangerouslySetInnerHTML={{ __html: t('about.cardTitle') }} />
          
          <ul className="about-checklist">
            <li>
              <div className="check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>{t('about.li1')}</span>
            </li>
            <li>
              <div className="check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>{t('about.li2')}</span>
            </li>
            <li>
              <div className="check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>{t('about.li3')}</span>
            </li>
          </ul>

          <div className="about-highlight">
            {t('about.highlight')}
          </div>

          <p className="about-subtext" dangerouslySetInnerHTML={{ __html: t('about.footer') }} />
        </div>
      </div>
    </section>
  )
}
