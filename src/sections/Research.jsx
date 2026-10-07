import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CodeSimple, FilePdf, Plus } from '@phosphor-icons/react';
import MonteCarloPaths from '@/components/MonteCarloPaths';
import PdfRequestDialog from '@/components/PdfRequestDialog';
import Tex from '@/components/Tex';
import { research } from '@/content/site';
import useLiteMode from '@/hooks/useLiteMode';

const EASE = [0.16, 1, 0.3, 1];

const linkMeta = {
  pdf: { label: 'PDF', Icon: FilePdf },
  doi: { label: 'DOI', Icon: ArrowUpRight },
  ssrn: { label: 'SSRN', Icon: ArrowUpRight },
  arxiv: { label: 'arXiv', Icon: ArrowUpRight },
  code: { label: 'Code', Icon: CodeSimple }
};

const linkClass =
  'inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[12px] text-bone transition-colors duration-200 hover:border-signal/50 hover:text-signal';

// href 'request' heißt: kein direkter Download, stattdessen Popup mit Anfrage per Mail
function PaperLinks({ paper }) {
  const entries = Object.entries(paper.links ?? {}).filter(([, href]) => href);
  if (!entries.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {entries.map(([key, href]) => {
        const meta = linkMeta[key] ?? { label: key, Icon: ArrowUpRight };
        const external = href.startsWith('http');
        if (href === 'request') {
          return (
            <li key={key}>
              <PdfRequestDialog paper={paper}>
                <button type="button" className={linkClass}>
                  <meta.Icon size={14} aria-hidden="true" />
                  {meta.label}
                </button>
              </PdfRequestDialog>
            </li>
          );
        }
        return (
          <li key={key}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={linkClass}
            >
              <meta.Icon size={14} aria-hidden="true" />
              {meta.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Topics({ topics }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] text-bone-muted">
      {topics.map(t => (
        <li key={t}>#{t}</li>
      ))}
    </ul>
  );
}

function PaperRow({ paper, open, onToggle }) {
  const reduce = useReducedMotion();
  const id = `paper-${paper.title.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <li className="border-t border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-2 py-6 text-left md:grid-cols-[70px_140px_1fr_auto] md:gap-x-8"
      >
        <span className="font-mono text-[13px] text-bone-muted md:pt-1">{paper.year}</span>
        <span className="h-fit w-fit rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-bone-muted uppercase md:mt-0.5">
          {paper.type}
        </span>
        <span className="col-span-3 md:col-span-1">
          <span className="block text-lg leading-snug font-medium text-bone transition-colors duration-200 group-hover:text-signal md:text-xl">
            {paper.title}
          </span>
          <span className="mt-2 block">
            <Topics topics={paper.topics} />
          </span>
        </span>
        <Plus
          size={20}
          aria-hidden="true"
          className={`col-start-3 row-start-1 mt-0.5 text-bone-muted transition-transform duration-300 md:col-start-4 ${open ? 'rotate-45 text-signal' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 md:grid-cols-[70px_140px_1fr] md:gap-x-8">
              <div className="space-y-5 md:col-start-3">
                <p className="max-w-[70ch] text-[15px] leading-relaxed text-bone-muted">{paper.abstract}</p>
                {paper.formula && (
                  <div className="overflow-x-auto rounded-[20px] border border-line bg-ink-raised px-5 py-4 text-bone">
                    <Tex tex={paper.formula} display />
                    {paper.formulaNote && (
                      <p className="mt-3 text-[13px] leading-relaxed text-bone-muted">{paper.formulaNote}</p>
                    )}
                  </div>
                )}
                <PaperLinks paper={paper} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

// Research: Monte-Carlo-Pfade als Einstieg, ein hervorgehobenes Paper, darunter alle Arbeiten zum Filtern und Aufklappen.
export default function Research() {
  const lite = useLiteMode();
  const featured = research.papers.find(p => p.featured) ?? research.papers[0];
  const types = useMemo(() => {
    const counts = new Map();
    const rest = research.papers.filter(p => p !== featured);
    rest.forEach(p => counts.set(p.type, (counts.get(p.type) ?? 0) + 1));
    return [['Alle', rest.length], ...counts];
  }, [featured]);
  const [filter, setFilter] = useState('Alle');
  const [openTitle, setOpenTitle] = useState(null);

  const list = research.papers
    .filter(p => p !== featured)
    .filter(p => filter === 'Alle' || p.type === filter)
    .sort((a, b) => b.year - a.year);

  return (
    <section id="research" className="relative py-24 md:py-32">
      {/* Einstieg: simulierte Kurspfade hinter der Headline */}
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 opacity-90">
          <MonteCarloPaths paths={lite ? 24 : 48} />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="mx-auto flex min-h-[64dvh] max-w-[1400px] flex-col justify-end px-4 pb-10 md:px-8">
          <p className="font-narrow text-outline text-[clamp(1.8rem,4vw,3.6rem)] leading-none font-extrabold uppercase">
            {research.accent}
          </p>
          <h2 className="font-wide mt-4 text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-black tracking-tight uppercase">
            {research.title}
          </h2>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-bone-muted">{research.intro}</p>
          <p className="mt-8 font-mono text-[11px] tracking-wide text-bone-muted uppercase">
            Im Hintergrund: {lite ? 24 : 48} simulierte Kurspfade, geometrische Brownsche Bewegung, Medianpfad in Grün
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Hervorgehobenes Paper */}
        <article className="mt-6 grid gap-8 rounded-[20px] border border-line bg-ink-raised p-7 md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] text-bone-muted">
              <span>{featured.year}</span>
              <span className="rounded-full border border-signal/40 px-2.5 py-0.5 text-[11px] tracking-wide text-signal uppercase">
                {featured.type}
              </span>
              <span>{featured.venue}</span>
            </div>
            <h3 className="mt-5 text-2xl leading-snug font-medium text-bone md:text-3xl">{featured.title}</h3>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-bone-muted">{featured.abstract}</p>
            <div className="mt-6 flex flex-col gap-4">
              <Topics topics={featured.topics} />
              <PaperLinks paper={featured} />
            </div>
          </div>
          {featured.formula && (
            <div className="flex flex-col items-center justify-center overflow-x-auto rounded-[20px] border border-line bg-ink px-6 py-10 text-bone md:col-span-5">
              <Tex tex={featured.formula} display className="text-[1.35rem] md:text-[1.6rem]" />
              {featured.formulaNote && (
                <p className="mt-4 max-w-[44ch] text-center text-[13px] leading-relaxed text-bone-muted">
                  {featured.formulaNote}
                </p>
              )}
            </div>
          )}
        </article>

        {/* Filter nach Art der Arbeit */}
        <div className="mt-16 flex flex-wrap gap-2" role="group" aria-label="Nach Art filtern">
          {types.map(([type, count]) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-colors duration-200 active:scale-[0.98] ${
                filter === type ? 'border-bone bg-bone text-ink' : 'border-line text-bone-muted hover:border-bone/40 hover:text-bone'
              }`}
            >
              {type} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>

        <ol className="mt-6 border-b border-line">
          {list.map(paper => (
            <PaperRow
              key={paper.title}
              paper={paper}
              open={openTitle === paper.title}
              onToggle={() => setOpenTitle(t => (t === paper.title ? null : paper.title))}
            />
          ))}
          {list.length === 0 && (
            <li className="border-t border-line py-10 text-[15px] text-bone-muted">
              In dieser Kategorie ist das hervorgehobene Paper oben die einzige Arbeit.
            </li>
          )}
        </ol>
      </div>
    </section>
  );
}
