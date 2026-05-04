import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const navRef = useRef(null)
  const { t } = useTranslation()

  const links = [
    { key: 'services', label: t('nav.services'), href: '#work' },
    { key: 'about', label: t('nav.about'), href: '#about' },
    { key: 'process', label: t('nav.process'), href: '#process' },
    { key: 'contact', label: t('nav.contact'), href: '#contact' }
  ]

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, [])

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-logo">Studio✦</div>

      <ul className="navbar-links">
        {links.map(l => (
          <li key={l.key}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <LanguageSwitcher />
        <a href="#contact" className="navbar-cta" data-cursor>
          {t('nav.cta')}
        </a>
      </div>
    </nav>
  )
}
