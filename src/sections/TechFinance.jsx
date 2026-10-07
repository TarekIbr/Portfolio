import { lazy, Suspense } from 'react';
import { useReducedMotion } from 'motion/react';
import LazyMount from '@/components/LazyMount';
import Tex from '@/components/Tex';
import { techFinance } from '@/content/site';
import useLiteMode from '@/hooks/useLiteMode';

// three.js nur laden, wenn die Section in die Nähe kommt
const LaserFlow = lazy(() => import('@/components/LaserFlow'));
const MetallicPaint = lazy(() => import('@/components/MetallicPaint'));

// Signature-Moment: ein grüner Laser fällt von oben auf das Panel. Das "×" ist flüssiges Metall.
export default function TechFinance() {
  // Auf dem Handy und bei Reduced Motion: statischer Strahl und normales ×, kein WebGL
  const reducedMotion = useReducedMotion();
  const lite = useLiteMode();
  const reduce = reducedMotion || lite;
  const [left, right] = techFinance.title;

  const staticBeam = (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 mx-auto h-[52%] w-[3px] bg-gradient-to-b from-transparent via-signal/70 to-signal shadow-[0_0_40px_6px_rgba(61,255,138,0.35)]"
    />
  );

  return (
    <section id="technology-finance" className="relative isolate min-h-[115dvh] overflow-hidden">
      {reduce ? (
        staticBeam
      ) : (
        <LazyMount className="absolute inset-0 -z-10" fallback={staticBeam}>
          <Suspense fallback={staticBeam}>
            <LaserFlow
              color="#3dff8a"
              backgroundColor="#0b0b0c"
              horizontalBeamOffset={0}
              verticalBeamOffset={-0.06}
              wispDensity={1.3}
              wispIntensity={7}
              fogIntensity={0.55}
              flowSpeed={0.3}
              decay={1.0}
            />
          </Suspense>
        </LazyMount>
      )}

      <div className="relative mx-auto flex min-h-[115dvh] max-w-[1400px] items-end px-4 pb-16 md:px-8 md:pb-24">
        <div className="relative w-full rounded-[20px] border border-signal/30 bg-ink/95 p-7 shadow-[0_-30px_120px_-40px_rgba(61,255,138,0.45)] md:bg-ink/85 md:p-12 md:backdrop-blur-md">
          <h2 className="font-wide flex flex-wrap items-center gap-x-5 gap-y-2 text-[clamp(1.8rem,6.4vw,6rem)] leading-[0.95] font-black tracking-tight uppercase">
            <span>{left}</span>
            <span className="relative inline-block size-[1.05em] shrink-0" aria-label="mal">
              {reduce ? (
                <span className="flex size-full items-center justify-center text-signal">×</span>
              ) : (
                <LazyMount className="size-full" fallback={<span className="flex size-full items-center justify-center">×</span>}>
                  <Suspense fallback={null}>
                    <MetallicPaint
                      imageSrc="/mark-times.svg"
                      lightColor="#ffffff"
                      darkColor="#0b0b0c"
                      tintColor="#9dffc4"
                      speed={0.25}
                      liquid={0.8}
                      chromaticSpread={1.6}
                    />
                  </Suspense>
                </LazyMount>
              )}
            </span>
            <span>{right}</span>
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-bone md:col-span-7 md:text-xl">{techFinance.text}</p>
            <ul className="flex flex-wrap content-start gap-2 md:col-span-4 md:col-start-9">
              {techFinance.topics.map(topic => (
                <li
                  key={topic}
                  className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[12px] tracking-wide text-bone-muted uppercase transition-colors duration-200 hover:border-signal/50 hover:text-signal"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Formeln, mit denen ich arbeite */}
          <dl className="mt-10 grid gap-4 border-t border-line pt-8 md:grid-cols-3">
            {techFinance.formulas.map(f => (
              <div key={f.label} className="rounded-[20px] border border-line bg-ink px-5 py-5">
                <dt className="font-mono text-[11px] tracking-wide text-bone-muted uppercase">{f.label}</dt>
                <dd className="mt-3 overflow-x-auto text-[1.05rem] text-bone">
                  <Tex tex={f.tex} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
