import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * MorphSphere — canvas-based iridescent morphing sphere.
 * Uses a signed-distance field approach with simplex-noise-like
 * perturbation driven by GSAP tweens for smooth looping motion.
 */
export default function MorphSphere({ size = 560 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const S = size
    canvas.width  = S
    canvas.height = S

    // State tweened by GSAP
    const state = { phase: 0, wobble: 0, hueShift: 0 }

    // Simplex-like noise (deterministic, no deps)
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10) }
    function lerp(a, b, t) { return a + t * (b - a) }
    const p = new Uint8Array(512)
    const perm = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,
      103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,
      252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,
      68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,
      230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,
      76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,
      186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,
      59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,
      70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
      178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,
      241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,
      176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,
      128,195,78,66,215,61,156,180]
    for (let i = 0; i < 256; i++) p[i] = p[i + 256] = perm[i]

    function grad(hash, x, y) {
      const h = hash & 7
      const u = h < 4 ? x : y
      const v = h < 4 ? y : x
      return ((h & 1) ? -u : u) + ((h & 2) ? -v : v)
    }
    function noise2d(x, y) {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      x -= Math.floor(x); y -= Math.floor(y)
      const u = fade(x), v = fade(y)
      const a  = p[X]+Y, aa = p[a], ab = p[a+1]
      const b  = p[X+1]+Y, ba = p[b], bb = p[b+1]
      return lerp(
        lerp(grad(p[aa], x,   y),   grad(p[ba], x-1, y),   u),
        lerp(grad(p[ab], x,   y-1), grad(p[bb], x-1, y-1), u),
        v
      )
    }

    // Animate state with GSAP infinite looping tweens
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(state, { phase: Math.PI * 2, duration: 8,  ease: 'none' }, 0)
      .to(state, { wobble: 1,          duration: 4,  ease: 'sine.inOut' }, 0)
      .to(state, { hueShift: 360,      duration: 12, ease: 'none' }, 0)

    let raf
    function draw() {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, S, S)

      const cx = S / 2, cy = S / 2
      const R  = S * 0.38

      // Draw sphere pixel by pixel via ImageData
      const img = ctx.createImageData(S, S)
      const d   = img.data

      for (let py = 0; py < S; py++) {
        for (let px = 0; px < S; px++) {
          const dx = (px - cx) / R
          const dy = (py - cy) / R
          const r2 = dx * dx + dy * dy

          // Basic sphere surface check
          if (r2 > 1.0) continue

          const dz    = Math.sqrt(1 - r2)
          const t     = state.phase
          const wob   = state.wobble

          // Surface normal + noise displacement
          const nx    = dx + noise2d(dx * 2.5 + t * 0.3, dy * 2.5 + t * 0.2) * 0.18 * wob
          const ny    = dy + noise2d(dx * 2.5 - t * 0.2, dy * 2.5 + t * 0.4) * 0.18 * wob

          // Iridescent hue based on surface normal & noise
          const angle    = Math.atan2(ny, nx)
          const baseHue  = ((angle / Math.PI) * 180 + 180 + state.hueShift) % 360
          const fresnel  = 1 - dz                   // edge glow
          const specular = Math.pow(Math.max(0, dz), 6)

          // Blend hues for the iridescent look
          const hue = (baseHue + noise2d(nx * 3, ny * 3 + t * 0.1) * 60) % 360
          const sat = 80 + fresnel * 20
          const lit = 30 + specular * 55 + fresnel * 25

          // Convert HSL → RGB inline
          const h_ = hue / 60
          const s_ = sat / 100
          const l_ = lit / 100
          const c  = (1 - Math.abs(2 * l_ - 1)) * s_
          const x_ = c * (1 - Math.abs(h_ % 2 - 1))
          const m  = l_ - c / 2
          let r, g, b
          if      (h_ < 1) { r = c; g = x_; b = 0 }
          else if (h_ < 2) { r = x_; g = c; b = 0 }
          else if (h_ < 3) { r = 0; g = c; b = x_ }
          else if (h_ < 4) { r = 0; g = x_; b = c }
          else if (h_ < 5) { r = x_; g = 0; b = c }
          else             { r = c; g = 0; b = x_ }

          // Edge fade-out
          const alpha = Math.max(0, 1 - r2 * r2) * 255
          const idx   = (py * S + px) * 4
          d[idx]   = (r + m) * 255
          d[idx+1] = (g + m) * 255
          d[idx+2] = (b + m) * 255
          d[idx+3] = alpha
        }
      }

      ctx.putImageData(img, 0, 0)

      // Bloom: glow layer on top
      ctx.save()
      const grd = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.1)
      grd.addColorStop(0, 'rgba(155,92,255,0)')
      grd.addColorStop(1, `rgba(155,92,255,${0.12 + state.wobble * 0.05})`)
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      tl.kill()
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block' }}
    />
  )
}
