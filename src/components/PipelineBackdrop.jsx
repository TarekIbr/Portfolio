// Hintergrund für die Automation-Kachel: ein Workflow-Graph wie in n8n.
// Ruhend nur als feine Linien, beim Hover fließen Daten durch die Kanten und die Knoten leuchten nacheinander auf.
// Erwartet eine Elternkarte mit der Klasse "group".

const NODES = [
  { id: 'trigger', label: 'webhook', x: 30, y: 110, step: 0 },
  { id: 'parse', label: 'parse', x: 170, y: 55, step: 1 },
  { id: 'enrich', label: 'enrich', x: 170, y: 165, step: 1 },
  { id: 'merge', label: 'merge', x: 310, y: 110, step: 2 },
  { id: 'db', label: 'postgres', x: 450, y: 55, step: 3 },
  { id: 'notify', label: 'notify', x: 450, y: 165, step: 3 }
];

const W = 96;
const H = 34;
const byId = Object.fromEntries(NODES.map(n => [n.id, n]));

const EDGES = [
  ['trigger', 'parse'],
  ['trigger', 'enrich'],
  ['parse', 'merge'],
  ['enrich', 'merge'],
  ['merge', 'db'],
  ['merge', 'notify']
].map(([a, b]) => {
  const from = byId[a];
  const to = byId[b];
  const x1 = from.x + W;
  const y1 = from.y + H / 2;
  const x2 = to.x;
  const y2 = to.y + H / 2;
  const mid = (x1 + x2) / 2;
  return { key: `${a}-${b}`, d: `M${x1} ${y1} C${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}` };
});

export default function PipelineBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block [mask-image:linear-gradient(to_right,transparent_35%,black_58%)]"
    >
      <svg
        viewBox="0 0 570 240"
        className="absolute top-1/2 right-4 h-[68%] w-auto -translate-y-1/2 transition-transform duration-700 group-hover:scale-[1.03] md:right-8"
        fill="none"
      >
        {EDGES.map(e => (
          <g key={e.key}>
            <path d={e.d} stroke="var(--bone)" strokeOpacity="0.1" strokeWidth="1.5" />
            <path
              d={e.d}
              stroke="var(--signal)"
              strokeWidth="1.5"
              strokeDasharray="4 10"
              strokeLinecap="round"
              className="animate-flow opacity-0 transition-opacity duration-500 group-hover:opacity-80"
            />
          </g>
        ))}

        {NODES.map(n => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            <rect
              width={W}
              height={H}
              rx="9"
              fill="var(--ink)"
              stroke="var(--bone)"
              strokeOpacity="0.14"
              className="transition-[stroke,stroke-opacity] duration-300 group-hover:[stroke:var(--signal)] group-hover:[stroke-opacity:0.7]"
              style={{ transitionDelay: `${n.step * 120}ms` }}
            />
            <circle
              cx="15"
              cy={H / 2}
              r="3.5"
              fill="var(--bone)"
              fillOpacity="0.2"
              className="transition-[fill,fill-opacity] duration-300 group-hover:[fill:var(--signal)] group-hover:[fill-opacity:1]"
              style={{ transitionDelay: `${n.step * 120}ms` }}
            />
            <text
              x="27"
              y={H / 2 + 4}
              fill="var(--bone)"
              fillOpacity="0.28"
              className="font-mono text-[12px] transition-[fill-opacity] duration-300 group-hover:[fill-opacity:0.75]"
              style={{ transitionDelay: `${n.step * 120}ms` }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
