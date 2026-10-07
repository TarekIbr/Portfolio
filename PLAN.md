# Portfolio Tarek – Plan v2

## Context

Der erste Plan war zu sehr eine Template-Struktur (eine React-Bits-Komponente pro Section, Keyword-Leisten, Standard-Layout). Tarek hat einen neuen Design-Brief geschickt: großes, freigestelltes Portrait als interaktives digitales Objekt im Hero, riesige Outline-Typografie, die mit dem Körper verschmilzt, ein räumliches Projekt-Carousel, Skills als große Bereiche statt Liste, Wechsel zwischen ruhigen und lauten Abschnitten. Die Seite ist hauptsächlich Deutsch, die Claims sind Englisch. Sie soll persönlich wirken und nicht wie ein Template.

Der Inhalt aus der ersten Nachricht (Hero, Über mich, Projekte, Technology × Finance, Skills, Aktuell, Persönliches, Abschluss) bleibt die inhaltliche Grundlage. Das Design wird komplett neu gedacht. Texte und Bilder sind erstmal Platzhalter, die echten liefert Tarek später.

## Visuelle Richtung: „Build Log“

**Idee:** Die Seite ist Tareks Werkstatt- und Markt-Logbuch. Zwei Welten ziehen sich durch: **Code** (Monospace, Build-Status, Commits) und **Märkte** (Ticker, Kurse, Grün = up). Daraus entsteht ein Motiv, das nur zu ihm passt:

- **Der Ticker:** Ein schmales Laufband wie an der Börse, aber statt Aktienkursen zeigt es Tareks aktuelle Themen: `REVIEWFLOW ▲ building`, `WASGEHT ▲ live`, `LEARNING ▲ <Thema>`, `READING ▲ <Buch>`, `S&P 500 ▲ <echter Platzhalterwert>`. Es taucht im Hero auf und kommt im Abschluss wieder. Das ist der einzige Marquee auf der Seite.
- **Build-Status als Detail:** Kleine Mono-Labels zeigen echte Zustände, z. B. Projektstatus `live / in progress / experiment`. Sie sind keine Deko-Nummerierung.

**Farben (Dark, gesperrt):**
- Hintergrund Off-Black `#0B0B0C`
- Text Bone `#EDEBE6`
- Grautöne Zinc
- **Ein Akzent: Signal-Grün `#3DFF8A`** (das „Kurs steigt“-Grün). Es wird für den LaserFlow, für Status und für Hover verwendet, sonst nirgends.

**Typografie:**
- **Display:** Archivo Variable (`@fontsource-variable/archivo`, Achsen Breite und Gewicht). Breit und schwer für die Riesen-Outline im Hero, schmal für Headlines. TextPressure nutzt die Variable-Achsen.
- **Text:** Geist (schon installiert)
- **Labels, Ticker, Daten:** Geist Mono

**Radius:** Karten 20px, Buttons und Pills voll rund, Bilder 20px.

**Rhythmus:** laut → ruhig → laut → ruhig … (siehe Section-Liste)

## Sections

| # | Section | Rhythmus | Aufbau | React Bits / Technik |
|---|---|---|---|---|
| – | **Nav** | ruhig | Schmal (56px), links „Tarek“, rechts 4 Links (Work, Was ich mache, Log, Kontakt). Blendet beim Runterscrollen aus und beim Hochscrollen wieder ein. | eigene Komponente mit Motion `useScroll` (PillNav bräuchte react-router) |
| 1 | **Hero** „I build things.“ | **laut** | 3 Ebenen: (1) riesiges `I BUILD THINGS.` als Outline, breiter als der Viewport, hinter dem Portrait. (2) Freigestelltes Portrait ab Brust, zentral, unten angeschnitten. (3) Ein Teil desselben Textes gefüllt **vor** dem Körper, über eine Maske nur unten, sodass Text und Körper räumlich verschmelzen. Klein oben links „Hi, ich bin Tarek.“, unten links der deutsche Satz, unten rechts die Rollen. Ganz unten der Ticker. | **DitherVeil**: Das Portrait ist standardmäßig als 1-Bit-Dither gerastert, der Cursor „brennt“ es frei zum echten Foto (digitale Maske). Dazu eine Wrapper-Komponente mit Motion `useMotionValue`, die leichtes 3D-Tilt und Parallax zwischen den 3 Ebenen erzeugt. Fallback bei Touch und Reduced Motion: statisches Foto. |
| 2 | **Über mich** | ruhig | Großer, linksbündiger Fließtext (2–3 Sätze Mentalität) über 2/3 der Breite. Rechts eine kleine „Fakten“-Spalte in Mono (Ort, Fokus, aktuell). Signatur: „Learn. Build. Improve.“ | **ScrollReveal** (Text wird beim Scrollen scharf) |
| 3 | **Work** „Things I've built.“ | **laut** | Full-bleed räumliches Carousel mit Projekt-Screens, das aktive Projekt vorne. Darunter für das aktive Projekt eine 5-spaltige Info-Zeile: Was / Warum / Umgesetzt / Tech / Stand. Sie wechselt per `onChange` mit dem Carousel. | **FlexCarousel** (Liquid-Glass-Linse, `followCursor`, `onChange`). Die Info-Zeile wechselt mit einem Motion-Crossfade. Mobile: einspaltig, Wischen. |
| 4 | **Was ich mache** „Built from scratch.“ | ruhig/mittel | Bento mit 4 großen Bereichen in unterschiedlichen Größen: **Development** (groß), **Eigene Produkte**, **Finance**, **Automation**. In jeder Karte kleine Tech- und Tool-Chips. Darunter eine Prozess-Zeile: Idee → Design → Frontend → Backend → Deployment. | **SpotlightCard** für die Bereiche, **PixelCard** für „Eigene Produkte“ (Pixel-Reveal beim Hover). Tech-Logos über Simple Icons. |
| 5 | **Technology × Finance** | **laut** (Signature-Moment) | Ein grüner Laserstrahl fällt von oben in die Section und trifft ein Panel. Darin die Headline „Technology × Finance“, der deutsche Text und die Themen als Chips. Das „×“ ist ein großes Zeichen aus flüssigem Metall. | **LaserFlow** (Farbe Signal-Grün), **MetallicPaint** mit einer SVG-Vorlage des „×“. Beides wird nur gerendert, wenn die Section im Viewport ist. |
| 6 | **Currently building** | ruhig | Ein Build Log: datierte Einträge in Mono, je mit Typ-Tag `building / learning / experimenting` und einem Satz. Er wirkt wie ein Changelog und zeigt, woran Tarek gerade arbeitet. | **DecryptedText** auf den Eintragstiteln beim Reinscrollen, sonst bewusst still |
| 7 | **Mehr als Code** „Always curious.“ | mittel | Asymmetrische Foto-Collage (4–5 Bilder, verschiedene Formate) zu Unternehmertum, Märkten, Sport und Reisen, jeweils mit einer Zeile persönlichem Text. | **TiltedCard** (leichter 3D-Tilt) |
| 8 | **Kontakt** „What's next?“ | ruhig → **laut** | Links: ein Satz und vier große Text-Links (GitHub, LinkedIn, E-Mail, Lebenslauf). Rechts eine **Builder-ID-Karte** mit Name, „Developer × Finance“ und Kontakt. Danach der Ticker ein letztes Mal und über die volle Breite **„Still building.“**, das auf den Cursor reagiert. | **ReflectiveCard** angepasst: Statt der Webcam wird ein Bild gespiegelt (z. B. das Portrait). Die Webcam lässt sich optional per Klick „Spiegel an“ einschalten (Easter Egg). Lucide-Icons werden durch Phosphor ersetzt, Inhalte kommen per Props. Dazu **TextPressure** mit Archivo Variable. |
| – | Global | – | Fixiertes Grain-Overlay, Lenis Smooth Scroll | **Noise**, `lenis` |

**Bewusst nicht dabei:**
- Ein eigener globaler Cursor. Die Cursor-Interaktionen sitzen in DitherVeil, FlexCarousel und TextPressure.
- Section-Nummern, Scroll-Hinweise, Em-Dashes im Seitentext
- Mehr als 2 WebGL-Canvas gleichzeitig

## Umsetzung

### Dateien
- `src/content/site.js`: **alle Texte, Projekte, Links, Ticker-Einträge, Log-Einträge, Interessen** an einer Stelle. Tarek tauscht später nur hier aus. Alle Platzhalter sind mit `// PLACEHOLDER` markiert.
- `src/sections/`: `Hero.jsx`, `About.jsx`, `Work.jsx`, `Capabilities.jsx`, `TechFinance.jsx`, `BuildLog.jsx`, `Personal.jsx`, `Contact.jsx`
- `src/components/`:
  - `Nav.jsx`
  - `Ticker.jsx`
  - `InteractivePortrait.jsx` (DitherVeil + Tilt/Parallax)
  - `LazyMount.jsx` (IntersectionObserver: WebGL erst im Viewport mounten, außerhalb unmounten/pausieren)
- React Bits per `npx shadcn@latest add @react-bits/<Name>-JS-TW` (Registry ist in `components.json` eingetragen): DitherVeil, FlexCarousel, ScrollReveal, SpotlightCard, PixelCard, LaserFlow, MetallicPaint, DecryptedText, TiltedCard, ReflectiveCard (JS-CSS-Variante, da es nur diese gibt, dann angepasst), TextPressure, Noise
- `src/App.jsx`: setzt die Sections zusammen, initialisiert Lenis und verbindet es mit `ScrollTrigger.update`
- `src/index.css`: aufräumen. Die Reste aus dem Vite-Template (`--text`, `--accent-bg` …) und `src/App.css` kommen raus. Die Tokens (Farben, Fonts) gehen als Tailwind-v4-`@theme`, die shadcn-Variablen werden auf Dark gesetzt.
- `public/placeholder/`: Platzhalter-Medien

### Platzhalter
- **Portrait:** Picsum-Porträtfoto mit CSS-Maske (`mask-image`, unten und an den Seiten ausgeblendet), bis das echte freigestellte PNG/WebP (transparent, ab Brust, ca. 1600px hoch) kommt.
- **Projekt-Screens und Interessen-Fotos:** `https://picsum.photos/seed/<sprechender-seed>/<w>/<h>`
- **Texte:** sinngemäße deutsche Platzhalter auf Basis des Inhalts-Briefs, keine Lorem-ipsum

### Neue Pakete
- `@fontsource-variable/archivo`, `@fontsource-variable/geist-mono`
- `lenis`
- `@phosphor-icons/react`
- `gsap`, `@gsap/react`, `motion`, `ogl` und `three` kommen als Dependencies über die React-Bits-Komponenten

### Performance und Barrierefreiheit
- WebGL nur über `LazyMount`. Hero (DitherVeil) und Work (FlexCarousel) laufen nie gleichzeitig mit LaserFlow/MetallicPaint.
- `prefers-reduced-motion`: Lenis aus, kein Tilt, DitherVeil wird zum statischen Bild, LaserFlow wird zu einem statischen Gradient-Strahl, Ticker gestoppt.
- Mobile (< 768px): alles einspaltig. Das Portrait bleibt groß, die Outline-Schrift wird zweizeilig. FlexCarousel wird per Swipe bedient. LaserFlow mit reduzierter `dpr`.
- `min-h-[100dvh]` statt `h-screen`. Bilder mit festen Maßen (kein CLS).

### Reihenfolge
1. Fundament: Pakete, `index.css`-Tokens, Fonts, `site.js`, Lenis, Nav, Ticker, `LazyMount`
2. Hero mit interaktivem Portrait (prüfen, ob DitherVeil Transparenz sauber darstellt, sonst Fallback auf PixelTransition zwischen Foto und gepixelter Ebene)
3. Über mich + Work
4. Was ich mache + Technology × Finance
5. Build Log + Mehr als Code + Kontakt
6. Feinschliff: Mobile, Reduced Motion, Performance, `PLAN.md` im Projekt auf v2 aktualisieren

## Verifikation

- `npm run build` und `npm run lint` ohne Fehler
- `npm run dev` und dann **Playwright-MCP** (nach Neustart verfügbar): Screenshots jeder Section bei 1440px und 390px. Hover auf dem Portrait, das Carousel durchklicken, mit Reduced-Motion-Emulation prüfen. Die Console muss frei von Fehlern sein.
- Am Ende Pre-Flight-Check von `design-taste-frontend` (keine Em-Dashes, eine Akzentfarbe, ein Marquee …) und ein Review mit `web-design-guidelines`

## Update: Finance & Mathe, Research

- Neue Section **Research** „Papers & Studien.“ (`src/sections/Research.jsx`) direkt nach Technology × Finance: Monte-Carlo-Kurspfade (GBM, fester Seed) als Header-Visual, ein hervorgehobenes Paper mit Formel, darunter alle Arbeiten mit Filter nach Art und aufklappbarem Abstract, Formel und Links (PDF, DOI, SSRN, arXiv, Code).
- Formeln werden mit **KaTeX** gesetzt (`src/components/Tex.jsx`). Technology × Finance zeigt drei Formeln (Sharpe Ratio, GBM, GARCH).
- Finance-Kachel und Rollen im Hero betonen Mathematik und Quantitative Finance, der Ticker enthält Paper und Modelle.
- Inhalte in `src/content/site.js` unter `research` (PLACEHOLDER). PDFs gehören nach `public/papers/`.
