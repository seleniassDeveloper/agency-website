import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const links = ['Servicios', 'Nosotros', 'Proceso', 'Contacto']

export default function Navbar() {
  const navRef = useRef(null)

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
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </ul>

      <a href="#contacto" className="navbar-cta" data-cursor>
        Contactar
      </a>
    </nav>
  )
}
