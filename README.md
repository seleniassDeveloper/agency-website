# Agency Website

Dark, immersive agency portfolio — inspired by the Sling Shot / Buzzworthy Studio aesthetic.

## Stack

| Tool | Purpose |
|------|---------|
| Vite + React 18 | Build & UI |
| GSAP + ScrollTrigger | Scroll animations, clip-path reveals, stagger |
| Lenis | Butter-smooth scroll |
| Framer Motion | (available for page transitions if needed) |
| Space Grotesk + Syne | Google Fonts |

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project structure

```
src/
├── App.jsx              # Root — mounts Lenis + all sections
├── index.css            # Design tokens, global styles, all component CSS
├── main.jsx             # React entry point
└── components/
    ├── Cursor.jsx        # Custom magnetic cursor with glow ring
    ├── Navbar.jsx        # Fixed nav (mix-blend-mode: difference)
    ├── Hero.jsx          # Full-screen with blob bg + char-split title animation
    ├── Marquee.jsx       # Infinite horizontal marquee band
    ├── Work.jsx          # Gallery: full-width + split (image + info) cards
    ├── About.jsx         # Stacked vertical letters + stats + image reveal
    ├── Contact.jsx       # Large CTA with scroll-triggered title
    └── Footer.jsx        # Logo + socials + copyright
```

## Customize

### Colors
Edit CSS variables in `src/index.css` under `:root`:
```css
--purple: #9B5CFF;   /* main accent */
--pink:   #FF3CEA;   /* secondary */
--cyan:   #00D9F5;   /* tertiary */
```

### Projects (Work section)
Edit the `PROJECTS` array at the top of `src/components/Work.jsx`.

### Content
- Hero title words: `src/components/Hero.jsx` — edit the `SplitWord` lines.
- About text & stats: `src/components/About.jsx`.
- Contact CTA lines: `src/components/Contact.jsx` — edit the `LINES` array.

## Key effects

| Effect | How |
|--------|-----|
| Smooth scroll | Lenis + GSAP ticker sync |
| Char-by-char title entrance | GSAP stagger on `.char` spans |
| Image clip-path reveal on scroll | `gsap.fromTo` with `clipPath: 'inset(...)'` + ScrollTrigger |
| Hover image scale + overlay | Pure CSS transitions |
| Magnetic cursor glow ring | `requestAnimationFrame` lerp |
| Floating bg blobs | CSS `@keyframes blobFloat` + `filter: blur()` |
| Stacked vertical letters | CSS `flex-direction: column` on `.about-stacked-title` |
| Gradient text on stats | CSS `background-clip: text` |
