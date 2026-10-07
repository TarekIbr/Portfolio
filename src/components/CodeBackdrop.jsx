import { useEffect, useRef } from 'react';

const LINES = [
  "const { data } = await supabase",
  "  .from('projects')",
  "  .select('*, reviews(*)')",
  "  .eq('status', 'live');",
  '',
  'export default function App() {',
  '  const [items, setItems] = useState(data);',
  "  useRealtime('projects', setItems);",
  '  return <Dashboard items={items} />;',
  '}'
];

const TYPED = '// ship it';

// Hintergrund für die Development-Kachel: Code als Textur, unter dem Cursor leuchtet er grün auf.
// Beim Hover tippt sich eine letzte Zeile. Erwartet eine Elternkarte mit der Klasse "group".
export default function CodeBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const card = el?.parentElement;
    if (!card) return;
    const onMove = e => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    card.addEventListener('pointermove', onMove);
    return () => card.removeEventListener('pointermove', onMove);
  }, []);

  const code = (
    <>
      {LINES.map((line, i) => (
        <div key={i} className="flex gap-5 whitespace-pre">
          <span className="w-5 text-right opacity-50 select-none">{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
      <div className="flex gap-5 whitespace-pre">
        <span className="w-5 text-right opacity-50 select-none">{LINES.length + 1}</span>
        <span className="flex items-center">
          <span
            className="inline-block w-0 overflow-hidden transition-[width] duration-700 ease-[steps(10)] group-hover:w-[10ch]"
          >
            {TYPED}
          </span>
          <span className="ml-px inline-block h-[1.1em] w-[0.55em] animate-caret bg-current" />
        </span>
      </div>
    </>
  );

  const layer = 'absolute top-6 left-[45%] font-mono text-[12px] leading-[1.7] md:top-8 md:left-[56%] md:text-[13px]';

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent_45%,black_75%)] md:[mask-image:linear-gradient(to_right,transparent_55%,black_80%)]"
    >
      <div className={`${layer} text-bone/[0.07] transition-transform duration-700 group-hover:-translate-y-1`}>
        {code}
      </div>
      {/* Maske auf voller Kartengröße, damit --mx/--my zur Cursorposition passen */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          maskImage: 'radial-gradient(circle 180px at var(--mx, 50%) var(--my, 50%), black, transparent)',
          WebkitMaskImage: 'radial-gradient(circle 180px at var(--mx, 50%) var(--my, 50%), black, transparent)'
        }}
      >
        <div className={`${layer} text-signal/80 transition-transform duration-700 group-hover:-translate-y-1`}>
          {code}
        </div>
      </div>
    </div>
  );
}
