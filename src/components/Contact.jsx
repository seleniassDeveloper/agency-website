import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  
  // Use the first translated type as default
  const types = t('contact.form.types', { returnObjects: true })
  const defaultType = types[0]
  
  const [activeType, setActiveType] = useState(defaultType)
  const [selectedNeed, setSelectedNeed] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')

  const budgetsData = t('contact.form.budgets', { returnObjects: true })
  const needsData = t('contact.form.needs', { returnObjects: true })

  // Find the original key for budgets and needs based on the activeType index
  const activeIndex = types.indexOf(activeType) !== -1 ? types.indexOf(activeType) : 0
  
  // The original keys used in the translation JSON
  const typeKeys = ["Sitio Web", "Web App", "Sistema Interno", "Código Existente"]
  const activeKey = typeKeys[activeIndex]

  const activeBudgets = budgetsData[activeKey] || []
  const activeNeeds = needsData[activeKey] || []

  useEffect(() => {
    setSelectedNeed('')
    setSelectedBudget('')
  }, [activeType])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-eyebrow', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.contact-eyebrow', start: 'top 82%' } }
      )

      gsap.fromTo('.contact-title', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: '.contact-title', start: 'top 85%' } }
      )

      gsap.fromTo('.buzz-form', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.buzz-form', start: 'top 85%' } }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-bg" />

      <p className="contact-eyebrow">{t('contact.eyebrow')}</p>

      <h2 className="contact-title" style={{ fontSize: 'clamp(40px, 6vw, 90px)', marginBottom: '60px', textShadow: '0 0 40px rgba(0,255,255,0.2)' }}>
        {t('contact.title')}
      </h2>

      <form className="buzz-form glass-panel" onSubmit={(e) => { e.preventDefault(); window.location.href = 'mailto:hola@agencia.com'; }}>
        <div className="buzz-pills">
          {types.map(type => (
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

        <div className="buzz-dynamic-fields" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div className="contact-options-group">
            <label className="contact-label">{t('contact.form.budgetLabel')}</label>
            <div className="buzz-pills small">
              {activeBudgets.map(budget => (
                <button
                  key={budget}
                  type="button"
                  className={`buzz-pill small ${selectedBudget === budget ? 'active' : ''}`}
                  onClick={() => setSelectedBudget(budget)}
                >
                  <span className="buzz-pill-dot" />
                  {budget}
                </button>
              ))}
            </div>
          </div>

          <div className="contact-options-group">
            <label className="contact-label">{t('contact.form.needsLabel')}</label>
            <div className="buzz-pills small">
              {activeNeeds.map(need => (
                <button
                  key={need}
                  type="button"
                  className={`buzz-pill small ${selectedNeed === need ? 'active' : ''}`}
                  onClick={() => setSelectedNeed(need)}
                >
                  <span className="buzz-pill-dot" />
                  {need}
                </button>
              ))}
            </div>
          </div>

          <div className="buzz-input-group">
            <input type="text" className="buzz-input" placeholder={t('contact.form.name')} required />
          </div>
          
          <div className="buzz-input-group">
            <input type="email" className="buzz-input" placeholder={t('contact.form.email')} required />
          </div>
          
          <div className="buzz-input-group">
            <textarea 
              className="buzz-input" 
              placeholder={t('contact.form.details')} 
              rows="1"
            />
          </div>
        </div>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="buzz-submit" data-cursor>
            {t('contact.form.submit')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </section>
  )
}
