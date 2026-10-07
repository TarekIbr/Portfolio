import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import InteractivePortrait from '@/components/InteractivePortrait';
import Ticker from '@/components/Ticker';
import { person } from '@/content/site';

const EASE = [0.16, 1, 0.3, 1];

// Drei Ebenen: Outline-Typo hinter dem Portrait, das Portrait, gefüllte Typo davor.
// Die Maus verschiebt die Ebenen unterschiedlich stark, dadurch entsteht Tiefe.
export default function Hero() {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 26 });
  const y = useSpring(rawY, { stiffness: 40, damping: 26 });

  const backX = useTransform(x, v => v * -5);
  const backY = useTransform(y, v => v * -3);
  const frontX = useTransform(x, v => v * 8);
  const frontY = useTransform(y, v => v * 4);

  const onPointerMove = e => {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const [line1, line2] = ['I build', 'things.'];

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden pt-14"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <h1 className="sr-only">
        {person.greeting} {person.claim}
      </h1>

      {/* Ebene 1: Outline hinter dem Portrait */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[16dvh] z-0 flex justify-center select-none md:top-[13dvh]"
        style={{ x: reduce ? 0 : backX, y: reduce ? 0 : backY }}
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      >
        <span className="font-wide text-outline text-[21vw] leading-[0.82] font-black whitespace-nowrap uppercase md:text-[16vw]">
          {line1}
        </span>
      </motion.div>

      {/* Ebene 2: Portrait */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 flex justify-center">
        <motion.div
          className="h-[86dvh] max-h-[1300px] md:h-[100dvh]"
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <InteractivePortrait
            portrait={person.portrait}
            alt={`Portrait von ${person.firstName}`}
            tiltX={x}
            tiltY={y}
            className="h-full"
          />
        </motion.div>
      </div>

      {/* Ebene 3: gefüllte Zeile vor dem Körper, invertiert sich über dem Portrait */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[24dvh] z-[26] flex md:z-20 justify-center select-none md:bottom-[21dvh] md:mix-blend-difference"
        style={{ x: reduce ? 0 : frontX, y: reduce ? 0 : frontY }}
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
      >
        <span className="font-wide text-[16.5vw] leading-[0.82] font-black whitespace-nowrap text-bone uppercase md:text-[16vw]">
          {line2}
        </span>
      </motion.div>

      {/* Mobile: Verlauf, damit der Intro-Text über dem Portrait lesbar bleibt */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[44%] bg-gradient-to-t from-ink from-40% via-ink/90 to-transparent md:hidden"
      />

      {/* Kleine Texte am Rand */}
      <div className="pointer-events-none relative z-30 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-4 pt-6 pb-20 md:px-8 md:pb-16">
        <motion.p
          className="text-lg font-medium md:text-xl"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {person.greeting}
        </motion.p>

        <div className="flex items-end justify-between gap-6">
          <motion.p
            className="max-w-[40ch] text-[15px] leading-relaxed text-bone-muted md:text-base"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          >
            {person.intro}
          </motion.p>
          <motion.ul
            className="hidden text-right font-mono text-[12px] leading-6 tracking-wide text-bone-muted uppercase md:block"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          >
            {person.roles.map(role => (
              <li key={role}>{role}</li>
            ))}
          </motion.ul>
        </div>
      </div>

      <Ticker className="absolute inset-x-0 bottom-0 z-30" />
    </section>
  );
}
