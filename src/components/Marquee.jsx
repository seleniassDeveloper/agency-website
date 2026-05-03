const ITEMS = [
  'Design', 'Development', 'Motion', 'Branding',
  'Strategy', 'UX / UI', 'Identity', 'Web Apps',
]

function Track({ reverse = false }) {
  /* Duplicate items so the loop is seamless */
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="marquee-track">
      <div className={`marquee-inner${reverse ? ' reverse' : ''}`}>
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
      {/* Clone for seamless loop */}
      <div className={`marquee-inner${reverse ? ' reverse' : ''}`} aria-hidden>
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="marquee-section">
      <Track />
    </section>
  )
}
