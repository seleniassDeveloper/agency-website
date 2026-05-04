import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)
  const bottomRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial Page Load Animation
      const tlLoad = gsap.timeline({ delay: 0.2 })

      tlLoad.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' })

      tlLoad.from([title1Ref.current, title2Ref.current], {
        y: '50%',
        opacity: 0,
        rotationZ: 5,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power4.out'
      }, '-=0.8')

      tlLoad.from(bottomRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1')

      // 2. Scroll Scrub Animation (Buzzworthy Style)
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5, // Super smooth scrub
        }
      })

      // The text parts ways dramatically
      tlScroll.to(title1Ref.current, {
        xPercent: -100,
        skewX: -10,
        opacity: 0,
        ease: 'power1.inOut'
      }, 0)

      tlScroll.to(title2Ref.current, {
        xPercent: 100,
        skewX: 10,
        opacity: 0,
        ease: 'power1.inOut'
      }, 0)

      // The bottom content fades down
      tlScroll.to(bottomRef.current, {
        y: 150,
        opacity: 0,
        ease: 'power1.in'
      }, 0)

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-section" id="hero" ref={heroRef} style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Massive Typographic Lockup with Blend Mode */}
      <div className="hero-typography-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center', mixBlendMode: 'difference', zIndex: 10, pointerEvents: 'none' }}>
        <h1 style={{ margin: 0, lineHeight: 0.85, textTransform: 'uppercase', fontFamily: 'var(--font-display)', fontWeight: 900, whiteSpace: 'nowrap' }}>
          <div ref={title1Ref} style={{ fontSize: 'clamp(60px, 10vw, 250px)', color: 'white', willChange: 'transform, opacity' }}>
            {t('hero.title1')}
          </div>
          <div ref={title2Ref} style={{ fontSize: 'clamp(60px, 10vw, 250px)', color: 'transparent', WebkitTextStroke: '2px white', marginLeft: '10vw', willChange: 'transform, opacity' }}>
            {t('hero.title2')}
          </div>
        </h1>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 11, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '120px 0 60px 0' }}>
        <div className="hero-eyebrow" style={{ alignSelf: 'flex-start', mixBlendMode: 'difference', color: 'white' }}>{t('hero.eyebrow')}</div>

        <div className="hero-bottom" ref={bottomRef} style={{ alignSelf: 'flex-start', marginTop: 'auto', mixBlendMode: 'difference', color: 'white' }}>
          <p className="hero-sub" style={{ maxWidth: '550px', fontSize: 'clamp(16px, 2vw, 20px)' }} dangerouslySetInnerHTML={{ __html: t('hero.desc') }} />

          <a href="#contact" className="hero-cta" data-cursor style={{ marginTop: '40px', borderColor: 'white', color: 'white' }}>
            <span>{t('hero.cta')}</span>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
