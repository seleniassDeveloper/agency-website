import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()

  const STEPS = [
    { num: '01', title: t('process.s1.title'), desc: t('process.s1.desc') },
    { num: '02', title: t('process.s2.title'), desc: t('process.s2.desc') },
    { num: '03', title: t('process.s3.title'), desc: t('process.s3.desc') },
    { num: '04', title: t('process.s4.title'), desc: t('process.s4.desc') },
    { num: '05', title: t('process.s5.title'), desc: t('process.s5.desc') },
  ]

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
            <div className="section-label process-label">{t('process.label')}</div>
            <h2 className="section-title process-title" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.1 }}>
              {t('process.title1')}<br/>{t('process.title2')}
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
