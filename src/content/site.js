// Alle Inhalte der Seite an einer Stelle.
// Alles, was mit PLACEHOLDER markiert ist, wird später durch echte Texte und Bilder ersetzt.

const img = name => `/placeholder/${name}.jpg`;

export const person = {
  firstName: 'Tarek',
  greeting: 'Hi, ich bin Tarek.',
  claim: 'I build things.',
  intro:
    'Ich entwickle digitale Produkte, setze eigene Ideen um und beschäftige mich mit Technologie, Finanzen und Unternehmertum.',
  // PLACEHOLDER
  roles: ['Developer', 'Quantitative Finance', 'Mathematik', 'Entrepreneurship'],
  // PLACEHOLDER: freigestelltes Portrait (PNG/WebP mit transparentem Hintergrund, ab Brust, ca. 1200 x 1500).
  // Sobald es da ist: portrait.src ersetzen und portrait.cutout auf true setzen.
  portrait: { src: "/placeholder/ElevenLabs_image_background-removal_2026-10-04T20_35_46.png", width: 1145, height: 1374, cutout: false }
};

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'Was ich mache', href: '#was-ich-mache' },
  { label: 'Log', href: '#log' },
  { label: 'Kontakt', href: '#kontakt' }
];

// Der Ticker: wie ein Börsenband, nur mit dem, woran ich gerade dran bin.
// PLACEHOLDER: Einträge anpassen.
export const ticker = [
  { symbol: 'REVIEWFLOW', value: 'building' },
  { symbol: 'WASGEHT', value: 'demo' },
  { symbol: 'LEARNING', value: 'Rust' },
  { symbol: 'PAPER', value: 'Volatility Clustering im DAX' },
  { symbol: 'READING', value: 'Atomic Habits' },
  { symbol: 'MODEL', value: 'GARCH(1,1)' },
  { symbol: 'AUTOMATION', value: 'Finance Checker' },
  { symbol: 'SHIPPED', value: '4 Projekte' },
  { symbol: 'NEXT', value: 'eigene Fintech-Idee' }
];

export const about = {
  title: 'Ein bisschen über mich.',
  // PLACEHOLDER
  text: 'Ich will verstehen, wie Dinge funktionieren. Deshalb baue ich sie lieber selbst, statt nur darüber zu lesen. Eine Idee ist für mich erst dann etwas wert, wenn sie läuft, Fehler macht und besser wird. Genau das treibt mich an, egal ob es um Code, Märkte oder ein eigenes Produkt geht.',
  signature: 'Learn. Build. Improve.',
  // PLACEHOLDER
  facts: [
    { label: 'Basis', value: 'Deutschland' },
    { label: 'Fokus', value: 'Produkte, Backend, Finance' },
    { label: 'Gerade', value: 'ReviewFlow' },
    { label: 'Antrieb', value: 'Dinge, die wirklich laufen' }
  ]
};

// PLACEHOLDER: Projekte, Screens und Infos.
export const projects = [
  {
    name: 'ReviewFlow',
    status: 'in progress',
    image: img('reviewflow-dashboard'),
    what: 'Ein Tool, das Bewertungen sammelt, auswertet und daraus konkrete Aufgaben macht.',
    why: 'Kleine Unternehmen bekommen Feedback, aber keine Zeit, es auszuwerten.',
    built: 'Dashboard, Auswertung, Benachrichtigungen, Auth und Abrechnung.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Supabase'],
    stage: 'Beta mit ersten Testnutzern'
  },
  {
    name: 'WASGEHT',
    status: 'Demo',
    image: img('wasgeht-app'),
    what: 'Eine App, die zeigt, was in deiner Stadt heute los ist.',
    why: 'Events sind über zehn Plattformen verstreut. Ich wollte eine Stelle für alles.',
    built: 'Mobile App, Event-Import, Kartenansicht und Push.',
    tech: ['React Native', 'Expo', 'Supabase'],
    stage: 'Live, wird weiterentwickelt'
  },
  {
    name: 'Trading-Bot',
    status: 'experiment',
    image: img('trading-bot-charts'),
    what: 'Ein automatisiertes System, das Strategien testet und Signale ausführt.',
    why: 'Ich wollte verstehen, was an einer Strategie wirklich funktioniert und was nur gut aussieht.',
    built: 'Backtesting, Datenpipeline, Risiko-Regeln und Paper-Trading.',
    tech: ['Python', 'Pandas', 'REST APIs', 'Docker'],
    stage: 'Paper-Trading, Version 2 in Arbeit'
  },
  {
    name: 'Automation Stack',
    status: 'live',
    image: img('automation-pipeline'),
    what: 'Kleine Automationen, die mir jeden Tag Zeit sparen.',
    why: 'Alles, was ich zweimal mache, will ich kein drittes Mal von Hand machen.',
    built: 'Workflows für Daten, Reports und Benachrichtigungen.',
    tech: ['n8n', 'Node.js', 'Cron', 'APIs'],
    stage: 'Läuft täglich'
  },
  {
    name: 'Nächstes Projekt',
    status: 'experiment',
    image: img('next-project-sketch'),
    what: 'Hier landet alles, was als Nächstes kommt.',
    why: 'Weil es immer eine nächste Idee gibt.',
    built: 'Konzept und erste Prototypen.',
    tech: ['tbd'],
    stage: 'Idee'
  }
];

export const capabilities = {
  title: 'Was ich mache.',
  statement: 'Built from scratch.',
  // PLACEHOLDER
  statementText: 'Ich setze meine Projekte selbst um, von der ersten Idee über Design, Frontend und Backend bis zum Deployment.',
  process: ['Idee', 'Design', 'Frontend', 'Backend', 'Deployment'],
  // PLACEHOLDER: echte Technologien eintragen. icon = Slug von simpleicons.org
  areas: [
    {
      key: 'development',
      title: 'Development',
      text: 'Web- und Mobile-Apps mit sauberem Frontend und einem Backend, das hält.',
      tools: [
        { name: 'React', icon: 'react' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'Supabase', icon: 'supabase' },
        { name: 'Expo', icon: 'expo' }
      ]
    },
    {
      key: 'products',
      title: 'Eigene Produkte',
      text: 'Ich baue nicht nur Features, sondern Produkte, die echte Nutzer haben.',
      tools: [
        { name: 'Figma', icon: 'figma' },
        { name: 'Stripe', icon: 'stripe' },
        { name: 'Vercel', icon: 'vercel' }
      ]
    },
    {
      key: 'finance',
      title: 'Finance',
      text: 'Märkte, Modelle und Mathematik: Stochastik, Statistik und Zeitreihen, um Risiko und Rendite wirklich zu verstehen.',
      tools: [
        { name: 'Python', icon: 'python' },
        { name: 'NumPy', icon: 'numpy' },
        { name: 'SciPy', icon: 'scipy' },
        { name: 'R', icon: 'r' },
        { name: 'Jupyter', icon: 'jupyter' },
        { name: 'LaTeX', icon: 'latex' }
      ]
    },
    {
      key: 'automation',
      title: 'Automation',
      text: 'Workflows, Bots und Pipelines, die Arbeit von selbst erledigen.',
      tools: [
        { name: 'n8n', icon: 'n8n' },
        { name: 'Docker', icon: 'docker' },
        { name: 'GitHub Actions', icon: 'githubactions' }
      ]
    }
  ]
};

export const techFinance = {
  title: ['Technology', 'Finance'],
  text: 'Neben Softwareentwicklung beschäftige ich mich intensiv mit Finanzmärkten, Investments, Wirtschaft und Unternehmertum. Besonders spannend finde ich die Verbindung zwischen Technologie und Finanzwelt.',
  topics: ['Financial Markets', 'Quantitative Finance', 'Stochastik', 'Risk', 'Investing', 'FinTech', 'Economics'],
  // Formeln, mit denen ich arbeite (LaTeX, gerendert mit KaTeX)
  formulas: [
    { label: 'Sharpe Ratio', tex: 'S = \\dfrac{\\mathbb{E}[R_p - R_f]}{\\sigma_p}' },
    { label: 'Geometrische Brownsche Bewegung', tex: 'dS_t = \\mu S_t\\,dt + \\sigma S_t\\,dW_t' },
    { label: 'GARCH(1,1)', tex: '\\sigma_t^2 = \\omega + \\alpha\\,\\varepsilon_{t-1}^2 + \\beta\\,\\sigma_{t-1}^2' }
  ]
};

// PLACEHOLDER: echte Papers und Studien eintragen.
// type: 'Paper' | 'Studie' | 'Seminararbeit' | 'Working Paper'
// links: pdf (z. B. '/papers/datei.pdf' aus public/papers), doi, ssrn, arxiv oder code (optional)
export const research = {
  title: 'Papers & Studien.',
  accent: 'Thinking in numbers.',
  intro:
    'Neben dem Bauen schreibe ich über Märkte, Modelle und Mathematik. Hier sind meine Arbeiten, von empirischen Studien bis zu theoretischen Papers.',
  papers: [
    {
      year: 2026,
      type: 'Paper',
      title: 'XAUUSD vs DXY: Wie stabil ist der inverse Zusammenhang zwischen Gold und US-Dollar?',
      venue: 'Eigenes Paper',
      topics: ['Korrelation', 'Regression', 'Zeitreihen', 'Makro'],
      abstract:
        'Gold gilt als Gegenspieler des US-Dollars: Steigt der DXY, fällt XAUUSD. Das Paper prüft diese Hypothese mit täglichen und wöchentlichen Returns, rollierender Korrelation und Regression und betrachtet Krisenperioden separat, um zu zeigen, wann der Zusammenhang hält und wann er bricht.',
      formula: '\\rho(X,Y) = \\frac{\\operatorname{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y}',
      formulaNote:
        'Pearson-Korrelation: Werte nahe −1 bedeuten stark gegenläufige Returns, 0 bedeutet keine lineare Beziehung, +1 bedeutet gleichgerichtete Returns.',
      links: { pdf: 'request', code: '#' },
      featured: true
    },
    {
      year: 2026,
      type: 'Studie',
      title: 'Momentum oder Zufall? Eine Backtest-Studie mit Bootstrap-Konfidenzintervallen',
      venue: 'Empirische Studie',
      topics: ['Backtesting', 'Statistik', 'Faktoren'],
      abstract:
        'Prüft eine einfache Momentum-Strategie auf europäischen Aktien und trennt mit Bootstrap-Verfahren echte Überrendite von statistischem Rauschen.',
      formula: '\\hat{\\theta}^{*}_{b} = \\theta(X^{*}_{b}),\\quad b = 1,\\dots,B',
      links: { pdf: 'request' }
    },
    {
      year: 2025,
      type: 'Paper',
      title: 'Optionsbewertung per Monte-Carlo-Simulation und Varianzreduktion',
      venue: 'Eigenes Paper',
      topics: ['Derivate', 'Stochastik', 'Numerik'],
      abstract:
        'Vergleicht die Monte-Carlo-Bewertung europäischer Optionen mit der Black-Scholes-Formel und zeigt, wie antithetische Variablen und Control Variates die Varianz senken.',
      formula: 'C = S_0 N(d_1) - K e^{-rT} N(d_2)',
      links: { pdf: 'request', code: '#' }
    },
    {
      year: 2025,
      type: 'Seminararbeit',
      title: 'Markowitz in der Praxis: Wie stabil sind effiziente Portfolios?',
      venue: 'Seminararbeit',
      topics: ['Portfoliotheorie', 'Optimierung'],
      abstract:
        'Zeigt, wie stark die Gewichte im Mean-Variance-Portfolio auf kleine Schätzfehler reagieren, und testet Shrinkage-Schätzer für die Kovarianzmatrix.',
      formula: '\\min_{w}\\; w^{\\top}\\Sigma w \\quad \\text{s.t.}\\; w^{\\top}\\mu = \\mu_p,\\; w^{\\top}\\mathbf{1} = 1',
      links: { pdf: 'request' }
    },
    {
      year: 2025,
      type: 'Studie',
      title: 'Zinsentscheidungen und Marktreaktion: Eine Event-Study zur EZB',
      venue: 'Empirische Studie',
      topics: ['Makro', 'Event Study', 'Ökonometrie'],
      abstract:
        'Misst abnormale Renditen europäischer Bankaktien rund um EZB-Zinsentscheidungen und vergleicht erwartete mit überraschenden Entscheidungen.',
      formula: 'AR_{i,t} = R_{i,t} - (\\hat{\\alpha}_i + \\hat{\\beta}_i R_{m,t})',
      links: { pdf: 'request' }
    },
    {
      year: 2024,
      type: 'Working Paper',
      title: 'Random Walks und Markteffizienz: Ein Variance-Ratio-Test auf Krypto-Märkten',
      venue: 'Working Paper',
      topics: ['Markteffizienz', 'Statistik', 'Krypto'],
      abstract:
        'Testet mit dem Variance-Ratio-Test nach Lo und MacKinlay, ob die Renditen großer Kryptowährungen einem Random Walk folgen.',
      formula: 'VR(q) = \\frac{\\operatorname{Var}(r_t + \\dots + r_{t-q+1})}{q\\,\\operatorname{Var}(r_t)}',
      links: { pdf: 'request' }
    }
  ]
};

export const buildLog = {
  title: 'Currently building.',
  text: 'Woran ich aktuell arbeite, was ich gerade lerne und womit ich experimentiere.',
  // PLACEHOLDER
  entries: [
    {
      date: '2026-09',
      type: 'building',
      title: 'ReviewFlow Beta',
      text: 'Onboarding für die ersten Testnutzer und das Abrechnungsmodell.'
    },
    { date: '2026-09', type: 'learning', title: 'Rust', text: 'Für schnellere Datenverarbeitung im Trading-Setup.' },
    {
      date: '2026-08',
      type: 'experimenting',
      title: 'LLM-Agents für Reports',
      text: 'Automatische Wochenberichte aus Markt- und Projektdaten.'
    },
    {
      date: '2026-08',
      type: 'learning',
      title: 'Unternehmensbewertung',
      text: 'DCF-Modelle und was Kennzahlen wirklich aussagen.'
    }
  ]
};

export const personal = {
  title: 'Mehr als Code.',
  statement: 'Always curious.',
  // PLACEHOLDER: eigene Fotos und Sätze
  items: [
    {
      title: 'Unternehmertum',
      text: 'Ideen, aus denen ein echtes Business werden kann.',
      image: img('interest-entrepreneurship'),
      w: 900,
      h: 1100
    },
    { title: 'Finanzmärkte', text: 'Morgens zuerst die Märkte, dann der Code.', image: img('interest-markets'), w: 1200, h: 800 },
    { title: 'Sport', text: 'Der Ausgleich, der den Kopf frei macht.', image: img('interest-sport'), w: 900, h: 900 },
    { title: 'Reisen', text: 'Neue Orte, neue Perspektiven.', image: img('interest-travel'), w: 1200, h: 900 },
    { title: 'Lesen', text: 'Biografien, Investing und alles über Systeme.', image: img('interest-books'), w: 900, h: 1200 }
  ]
};

export const contact = {
  title: "What's next?",
  text: 'Ich bin immer offen für neue Projekte, interessante Ideen und Möglichkeiten, Neues zu lernen.',
  // PLACEHOLDER: echte Links
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'E-Mail', href: 'mailto:hallo@example.com' },
    { label: 'Lebenslauf', href: '/lebenslauf.pdf' }
  ],
  outro: 'Still building.'
};
