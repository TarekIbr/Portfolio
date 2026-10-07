import { useEffect, useRef } from 'react';

// Leichte Variante des Projekt-Carousels fürs Handy: nativer Wisch-Streifen mit Scroll-Snap, kein WebGL.
// Meldet per onChange, welches Projekt gerade in der Mitte steht.
export default function ProjectStrip({ items, onChange, className = '' }) {
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const cards = [...strip.children];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) onChange?.(cards.indexOf(entry.target));
        });
      },
      { root: strip, threshold: 0.6 }
    );
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [items, onChange]);

  return (
    <ul
      ref={stripRef}
      className={`flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      aria-label="Projekte"
    >
      {items.map(item => (
        <li key={item.src} className="w-[84%] shrink-0 snap-center">
          <img
            src={item.src}
            alt={item.alt}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full rounded-[20px] object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
