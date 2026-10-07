import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { nav, person } from '@/content/site';

// Schmale Navigation: blendet beim Runterscrollen aus, beim Hochscrollen wieder ein.
export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', current => {
    const previous = scrollY.getPrevious() ?? 0;
    const next = current > previous && current > 120;
    if (next !== hidden) setHidden(next);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/95 md:bg-ink/70 md:backdrop-blur-md"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 md:px-8" aria-label="Hauptnavigation">
        <a href="#top" className="font-wide text-[15px] font-extrabold tracking-tight uppercase">
          {person.firstName}
          <span className="text-signal">.</span>
        </a>
        <ul className="flex items-center gap-5 text-[13px] text-bone-muted md:gap-8">
          {nav.map(item => (
            <li key={item.href} className={['#was-ich-mache', '#log'].includes(item.href) ? 'hidden md:block' : undefined}>
              <a href={item.href} className="transition-colors duration-200 hover:text-bone focus-visible:text-bone">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
