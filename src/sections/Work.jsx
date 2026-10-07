import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LazyMount from '@/components/LazyMount';
import ProjectStrip from '@/components/ProjectStrip';
import StatusTag from '@/components/StatusTag';
import { projects } from '@/content/site';
import useLiteMode from '@/hooks/useLiteMode';

const FlexCarousel = lazy(() => import('@/components/FlexCarousel'));

const items = projects.map(p => ({ src: p.image, alt: `Screen von ${p.name}`, title: p.name }));

// Lauter Abschnitt: räumliches Carousel mit den Projekt-Screens, darunter die Kerninfos zum aktiven Projekt.
export default function Work() {
  const [active, setActive] = useState(0);
  const lite = useLiteMode();
  const project = projects[active];

  const facts = [
    { label: 'Was', value: project.what },
    { label: 'Warum', value: project.why },
    { label: 'Umgesetzt', value: project.built },
    { label: 'Tech', value: project.tech.join(', ') },
    { label: 'Stand', value: project.stage }
  ];

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="text-[15px] text-bone-muted">Was ich baue.</p>
        <h2 className="font-wide mt-3 text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-black tracking-tight uppercase">
          Things I've built.
        </h2>
      </div>

      {lite ? (
        <ProjectStrip items={items} onChange={setActive} className="mt-8 mb-8" />
      ) : (
        <LazyMount className="mt-10 h-[62dvh] min-h-[420px] w-full md:mt-6 md:h-[78dvh]">
          <Suspense fallback={null}>
            <FlexCarousel
              items={items}
              preset="liquid"
              cardHeight={0.62}
              gap={28}
              radius={20}
              fit="landscape"
              followCursor
              captions={false}
              captureWheel={false}
              onChange={index => setActive(index)}
            />
          </Suspense>
        </LazyMount>
      )}

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-line pb-5">
              <h3 className="font-wide text-3xl font-extrabold tracking-tight uppercase md:text-4xl">{project.name}</h3>
              <StatusTag status={project.status} />
            </div>
            <dl className="grid gap-x-8 gap-y-6 pt-6 sm:grid-cols-2 lg:grid-cols-5">
              {facts.map(fact => (
                <div key={fact.label}>
                  <dt className="font-mono text-[11px] tracking-wide text-bone-muted uppercase">{fact.label}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-bone">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
