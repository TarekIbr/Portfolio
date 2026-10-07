# Was noch Demo ist

Alle Texte stehen in `src/content/site.js`. Die Stellen dort sind mit `PLACEHOLDER` markiert.
Bilder liegen in `public/placeholder/` und können danach komplett gelöscht werden.

## 1. Bilder

- [ ] **Portrait** (Hero): freigestellt mit transparentem Hintergrund, ab Brust, ca. 1200 × 1500 px, als PNG oder WebP.
  - In `site.js` bei `person.portrait`: `src` auf die neue Datei setzen, `width`/`height` anpassen und `cutout: true` setzen.
  - Hinweis: Die Datei muss wirklich transparent sein, sonst wird die Silhouette als Rechteck ausgeschnitten.
- [ ] **Projekt-Screens** (Work-Carousel): ein Screenshot pro Projekt, Querformat (z. B. 1600 × 1000). In `site.js` bei `projects[].image`.
- [ ] **Fotos „Mehr als Code“**: 5 eigene Fotos (Unternehmertum, Finanzmärkte, Sport, Reisen, Lesen oder eigene Themen). In `site.js` bei `personal.items[]` mit `image`, `w`, `h`.
- [ ] **Hintergrundbild der Finance-Kachel**: ist hart verdrahtet in `src/sections/Capabilities.jsx` (`/placeholder/interest-markets.jpg`). Durch ein eigenes Bild ersetzen oder entfernen.
- [ ] **Favicon**: `public/favicon.svg` ist noch das Vite-Logo.
- [ ] **Social-Preview-Bild** (fehlt noch): z. B. `public/og.jpg` mit 1200 × 630, wenn der Link auf LinkedIn usw. gut aussehen soll. Dann die passenden `og:`-Meta-Tags in `index.html` ergänzen.

## 2. Texte und Inhalte (`src/content/site.js`)

- [ ] **Hero** (`person`): `intro` und die vier `roles`.
- [ ] **Ticker** (`ticker`): alle Einträge. Er zeigt, woran du gerade arbeitest, was du liest, welches Paper oder Modell aktuell ist.
- [ ] **Über mich** (`about`): `text` und die vier `facts` (Basis, Fokus, Gerade, Antrieb).
- [ ] **Projekte** (`projects`): pro Projekt `name`, `status` (`live` / `in progress` / `experiment`), `what`, `why`, `built`, `tech`, `stage`. Der Eintrag „Nächstes Projekt“ ist reiner Platzhalter.
- [ ] **Was ich mache** (`capabilities`): `statementText`, die Texte der vier Bereiche und vor allem die **echten Tools**. `icon` ist der Slug von [simpleicons.org](https://simpleicons.org).
- [ ] **Technology × Finance** (`techFinance`): `topics` und die drei `formulas` (Formeln in LaTeX, an denen du wirklich arbeitest).
- [ ] **Papers & Studien** (`research`): `intro` und **alle 6 Arbeiten sind erfunden**. Pro Arbeit: `year`, `type`, `title`, `venue`, `topics`, `abstract`, optional `formula` (LaTeX) und `links`. Mit `featured: true` legst du fest, welche oben groß erscheint.
- [ ] **Currently building** (`buildLog`): alle 4 Einträge mit `date`, `type`, `title`, `text`.
- [ ] **Mehr als Code** (`personal`): Titel und Satz pro Foto.

## 3. Links und Dateien

- [ ] **GitHub** und **LinkedIn**: in `contact.links` stehen nur die Startseiten.
- [ ] **E-Mail**: `hallo@example.com` in `contact.links`.
- [ ] **Lebenslauf**: PDF als `public/lebenslauf.pdf` ablegen (der Link zeigt schon dorthin).
- [ ] **Paper-Links**: alle `links` in `research.papers` zeigen auf `#`. PDFs nach `public/papers/` legen und z. B. `pdf: '/papers/garch-dax.pdf'` eintragen, oder `doi` / `ssrn` / `arxiv` / `code` mit echter URL. Nicht vorhandene Links einfach weglassen.

## 4. Seite und Einrichtung

- [ ] **Seitentitel und Beschreibung** in `index.html` (`<title>` und `meta description`) prüfen.
- [ ] **README.md** ist noch die Vite-Vorlage.
- [ ] **`public/icons.svg`** stammt aus der Vite-Vorlage und wird nicht benutzt, kann gelöscht werden.
- [ ] **Ordner `public/placeholder/`** löschen, wenn alle echten Bilder drin sind (vorher nach `placeholder` in `src` suchen).
- [ ] **Hosting / Domain**: noch nicht eingerichtet (z. B. Vercel oder Netlify, `npm run build` erzeugt `dist/`).
- [ ] **Impressum und Datenschutz**: für eine öffentliche Seite in Deutschland in der Regel nötig, fehlen noch. Hinweis: Die Tool-Logos werden von `cdn.simpleicons.org` geladen, das gehört in die Datenschutzerklärung oder die Logos werden lokal eingebunden.
