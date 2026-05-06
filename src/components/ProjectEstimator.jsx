import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PROJECT_TYPES = [
  { id: 'landing',  baseTime: 1, complexity: 2 },
  { id: 'website',  baseTime: 2, complexity: 4 },
  { id: 'webapp',   baseTime: 6, complexity: 8 },
  { id: 'custom',   baseTime: 10, complexity: 10 },
]

const FEATURES = [
  { id: 'auth',     time: 1, complexity: 2 },
  { id: 'payments', time: 1, complexity: 3 },
  { id: 'cms',      time: 1, complexity: 2 },
  { id: 'motion',   time: 2, complexity: 4 },
  { id: 'api',      time: 1, complexity: 2 },
]

const TIMELINES = [
  { id: 'fast',     timeMult: 0.7 },
  { id: 'standard', timeMult: 1.0 },
  { id: 'relaxed',  timeMult: 1.3 },
]

export default function ProjectEstimator() {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState({
    type: null,
    features: [],
    timeline: 'standard',
    modality: 'project', // 'hourly' or 'project'
    modalityValue: '',   // hours per week or estimated months
    contact: { name: '', email: '' }
  })

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [step])

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const toggleFeature = (id) => {
    setSelections(prev => ({
      ...prev,
      features: prev.features.includes(id) 
        ? prev.features.filter(f => f !== id)
        : [...prev.features, id]
    }))
  }

  const calculateEstimate = () => {
    const type = PROJECT_TYPES.find(t => t.id === selections.type) || PROJECT_TYPES[0]
    const features = FEATURES.filter(f => selections.features.includes(f.id))
    const timeline = TIMELINES.find(tl => tl.id === selections.timeline) || TIMELINES[1]

    let totalTime  = type.baseTime + features.reduce((acc, f) => acc + f.time, 0)
    let complexity = type.complexity + features.reduce((acc, f) => acc + f.complexity, 0)

    totalTime *= timeline.timeMult

    return {
      time: Math.round(totalTime),
      complexity: Math.min(complexity, 20)
    }
  }

  const estimate = calculateEstimate()

  const steps = [
    // Step 1: Project Type
    <div key="step-type" className="estimator-step">
      <h3 className="estimator-step-title">{t('estimator.steps.type.title')}</h3>
      <div className="estimator-options grid-2">
        {PROJECT_TYPES.map(p => (
          <button 
            key={p.id}
            className={`option-card ${selections.type === p.id ? 'active' : ''}`}
            onClick={() => { setSelections({...selections, type: p.id}); nextStep(); }}
          >
            <div className="option-icon">{p.id === 'landing' ? '🚀' : p.id === 'website' ? '🌐' : p.id === 'webapp' ? '💻' : '⚙️'}</div>
            <span>{t(`estimator.steps.type.options.${p.id}`)}</span>
          </button>
        ))}
      </div>
    </div>,

    // Step 2: Features
    <div key="step-features" className="estimator-step">
      <h3 className="estimator-step-title">{t('estimator.steps.features.title')}</h3>
      <div className="estimator-options grid-2">
        {FEATURES.map(f => (
          <button 
            key={f.id}
            className={`option-card ${selections.features.includes(f.id) ? 'active' : ''}`}
            onClick={() => toggleFeature(f.id)}
          >
            <div className="option-checkbox">
               {selections.features.includes(f.id) && <motion.div layoutId="check" className="check-mark">✓</motion.div>}
            </div>
            <span>{t(`estimator.steps.features.options.${f.id}`)}</span>
          </button>
        ))}
      </div>
      <div className="step-actions">
        <button className="btn-secondary" onClick={prevStep}>←</button>
        <button className="btn-primary" onClick={nextStep}>Continuar</button>
      </div>
    </div>,

    // Step 3: Modality Selection
    <div key="step-modality" className="estimator-step">
      <h3 className="estimator-step-title">{t('estimator.steps.modality.title')}</h3>
      <div className="estimator-options grid-2">
        <button 
          className={`option-card ${selections.modality === 'hourly' ? 'active' : ''}`}
          onClick={() => setSelections({...selections, modality: 'hourly'})}
        >
          <div className="option-icon">⏱️</div>
          <span>{t('estimator.steps.modality.options.hourly')}</span>
        </button>
        <button 
          className={`option-card ${selections.modality === 'project' ? 'active' : ''}`}
          onClick={() => setSelections({...selections, modality: 'project'})}
        >
          <div className="option-icon">📦</div>
          <span>{t('estimator.steps.modality.options.project')}</span>
        </button>
      </div>
      
      <div className="estimator-form stack" style={{ marginTop: '20px' }}>
        <label className="input-label">
          {selections.modality === 'hourly' 
            ? t('estimator.steps.modality.hourlyFields.label') 
            : t('estimator.steps.modality.projectFields.label')}
        </label>
        <input 
          type="text" 
          placeholder={selections.modality === 'hourly' 
            ? t('estimator.steps.modality.hourlyFields.placeholder') 
            : t('estimator.steps.modality.projectFields.placeholder')}
          value={selections.modalityValue}
          onChange={(e) => setSelections({...selections, modalityValue: e.target.value})}
          className="estimator-input"
        />
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={prevStep}>←</button>
        <button className="btn-primary" onClick={nextStep} disabled={!selections.modalityValue}>Continuar</button>
      </div>
    </div>,

    // Step 4: Timeline
    <div key="step-timeline" className="estimator-step">
      <h3 className="estimator-step-title">{t('estimator.steps.timeline.title')}</h3>
      <div className="estimator-options stack">
        {TIMELINES.map(tl => (
          <button 
            key={tl.id}
            className={`option-card wide ${selections.timeline === tl.id ? 'active' : ''}`}
            onClick={() => { setSelections({...selections, timeline: tl.id}); nextStep(); }}
          >
            <span>{t(`estimator.steps.timeline.options.${tl.id}`)}</span>
          </button>
        ))}
      </div>
      <div className="step-actions">
        <button className="btn-secondary" onClick={prevStep}>←</button>
      </div>
    </div>,

    // Step 5: Contact
    <div key="step-contact" className="estimator-step">
      <h3 className="estimator-step-title">{t('estimator.steps.contact.title')}</h3>
      <div className="estimator-form stack">
        <div className="grid-2">
          <input 
            type="text" 
            placeholder={t('estimator.steps.contact.placeholderName')} 
            value={selections.contact.name}
            onChange={(e) => setSelections({...selections, contact: {...selections.contact, name: e.target.value}})}
            className="estimator-input"
          />
          <input 
            type="email" 
            placeholder={t('estimator.steps.contact.placeholderEmail')} 
            value={selections.contact.email}
            onChange={(e) => setSelections({...selections, contact: {...selections.contact, email: e.target.value}})}
            className="estimator-input"
          />
        </div>
        <textarea 
          placeholder={t('contact.form.details')} 
          value={selections.contact.details || ''}
          onChange={(e) => setSelections({...selections, contact: {...selections.contact, details: e.target.value}})}
          className="estimator-input"
          rows="4"
          style={{ minHeight: '120px', resize: 'none' }}
        />
        <button 
          className="btn-primary full" 
          disabled={!selections.contact.name || !selections.contact.email}
          onClick={nextStep}
        >
          {t('estimator.steps.contact.submit')}
        </button>
      </div>
      <div className="step-actions">
        <button className="btn-secondary" onClick={prevStep}>←</button>
      </div>
    </div>,

    // Step 6: Result
    <div key="step-result" className="estimator-result">
      <h3 className="result-title">{t('estimator.result.title')}</h3>
      <div className="result-grid">
        <div className="result-item">
          <label>{t('estimator.result.complexity')}</label>
          <div className="complexity-bar">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(estimate.complexity / 20) * 100}%` }}
              className="complexity-fill" 
            />
          </div>
        </div>
        <div className="result-stats">
          <div className="stat-card">
            <label>{t('estimator.result.time')}</label>
            <div className="stat-value">{estimate.time} {estimate.time === 1 ? 'semana' : 'semanas'}</div>
          </div>
          <div className="stat-card accent">
            <label>{t('estimator.result.modality')}</label>
            <div className="stat-value" style={{ fontSize: '20px' }}>
              {t(`estimator.steps.modality.options.${selections.modality}`)}
              <br/>
              <span style={{ fontSize: '14px', opacity: 0.7 }}>{selections.modalityValue}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="result-disclaimer">{t('estimator.result.disclaimer')}</p>
      <button className="btn-primary full result-cta">{t('estimator.result.cta')}</button>
      <button className="btn-text" onClick={() => setStep(0)}>Reiniciar</button>
    </div>
  ]

  return (
    <section className="estimator-section" id="estimator">
      <div className="container">
        <div className="estimator-header">
          <span className="section-label">{t('estimator.label')}</span>
          <h2 className="section-title">{t('estimator.title')}</h2>
        </div>

        <div className="estimator-container glass-panel">
          {step < steps.length - 1 && (
            <div className="progress-bar">
               <motion.div 
                className="progress-fill" 
                animate={{ width: `${((step + 1) / (steps.length - 1)) * 100}%` }}
               />
            </div>
          )}

          <div className="step-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {steps[step]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
