# Portfolio – tarek.vision

**Source code of my personal portfolio website.**

![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=black)

---

## Highlights

- **Interactive visuals:** WebGL effects with OGL (laser flow, metallic paint, noise), a pixelating and interactive portrait, tilted cards
- **Animation:** scroll reveals, decrypting text and pressure text with GSAP and Motion, smooth scrolling with Lenis
- **Math rendering:** formulas with KaTeX and a live Monte Carlo path simulation
- **Ticker:** a stock-ticker-style band that shows what I'm working on right now
- **Performance:** heavy sections only mount when they come into view (`LazyMount`)
- **All content in one file:** texts, projects and links live in `src/content/site.js`, so the layout code stays separate from the content

## Sections

Hero · Work · Research · What I do · Tech & Finance · Personal · Contact

## Tech stack

| Area | Technology |
|---|---|
| Framework | React 19, Vite |
| Styling | Tailwind CSS 4, Radix UI, class-variance-authority |
| Animation | GSAP, Motion, Lenis |
| Graphics | OGL (WebGL), KaTeX |
| Icons | Phosphor, Lucide |
| Linting | Oxlint |

## Project structure

```
src/
  content/site.js   all texts and data of the page
  sections/         page sections (Hero, Work, Research, …)
  components/       reusable visual components and effects
  hooks/, lib/      helpers
```

## Getting started

```bash
npm install
npm run dev       # dev server
npm run build     # production build
npm run lint      # lint with oxlint
```

---

Built by [Tarek](https://github.com/TarekIbr)
