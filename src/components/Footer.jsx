import { useTranslation } from 'react-i18next'

const SOCIALS = [
  { label: 'Twitter',   href: '#' },
  { label: 'Dribbble',  href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'GitHub',    href: '#' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-logo">Studio✦</div>

      <ul className="footer-links">
        {SOCIALS.map(s => (
          <li key={s.label}>
            <a href={s.href} data-cursor>{s.label}</a>
          </li>
        ))}
      </ul>

      <span className="footer-copy">{t('footer.copy')}</span>
    </footer>
  )
}
