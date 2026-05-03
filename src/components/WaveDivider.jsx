/* ─────────────────────────────────────────────────────────────
   WaveDivider — organic wavy SVG border between sections.
   Creates the Buzzworthy "melting palette" look where one
   section bleeds into the next via an irregular wave edge.

   position: 'top' | 'bottom'
   fill:     color that fills the wave (usually the ADJACENT section's bg)
   height:   px height of the wave band
   flip:     mirror horizontally for variety
   ───────────────────────────────────────────────────────────── */

export default function WaveDivider({
  position = 'top',
  fill     = '#07070E',
  height   = 100,
  flip     = false,
  animated = false,
}) {
  const isTop = position === 'top'
  const h     = height

  /* Two compatible paths to tween between (animated mode) */
  const pathA = `M0,0 L1440,0 L1440,${h - 12} C1280,${h + 18} 1040,${h - 22} 800,${h + 8} C560,${h + 30} 320,${h - 16} 160,${h + 6} C80,${h + 14} 0,${h - 6} 0,${h - 8} Z`

  return (
    <>
      {animated && (
        <style>{`
          @keyframes wave-breathe {
            0%,100% { d: path('${pathA}'); }
            50%      { d: path('M0,0 L1440,0 L1440,${h - 6} C1280,${h + 8} 1040,${h - 12} 800,${h + 4} C560,${h + 18} 320,${h - 8} 160,${h + 2} C80,${h + 6} 0,${h - 4} 0,${h - 4} Z'); }
          }
          .wave-path-live { animation: wave-breathe 9s ease-in-out infinite; }
        `}</style>
      )}
      <div
        style={{
          position:      'absolute',
          [isTop ? 'top' : 'bottom']: -1,
          left:          0,
          right:         0,
          height:        h,
          pointerEvents: 'none',
          zIndex:        3,
          lineHeight:    0,
          overflow:      'visible',
        }}
      >
        <svg
          viewBox={`0 0 1440 ${h}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width:   '100%',
            height:  '100%',
            display: 'block',
            transform: [
              isTop ? 'none' : 'scaleY(-1)',
              flip ? ' scaleX(-1)' : '',
            ].join(''),
          }}
        >
          <path
            className={animated ? 'wave-path-live' : ''}
            d={pathA}
            fill={fill}
          />
        </svg>
      </div>
    </>
  )
}
