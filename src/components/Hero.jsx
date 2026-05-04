import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'

function SplitWord({ word, className = '' }) {
  return (
    <span className={`word ${className}`}>
      {word.split('').map((ch, i) => (
        <span key={i} className="char" style={{ display: 'inline-block' }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef  = useRef(null)
  const titleRef = useRef(null)
  const { t } = useTranslation()

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
          <div className="hero-eyebrow">{t('hero.eyebrow')}</div>

          <h1 className="hero-title" ref={titleRef} style={{ fontSize: 'clamp(60px, 11vw, 170px)', width: '100%' }}>
            <div className="clip-wrap" style={{ display: 'block' }}>
              <SplitWord word={t('hero.title1')} />
            </div>
            <div className="clip-wrap" style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5%' }}>
              <SplitWord word={t('hero.title2')} className="accent" />
            </div>
          </h1>

          <div className="hero-bottom">
            <p className="hero-sub" style={{ maxWidth: '550px' }} dangerouslySetInnerHTML={{ __html: t('hero.desc') }} />

            <a href="#contact" className="hero-cta" data-cursor>
              <span>{t('hero.cta')}</span>
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
