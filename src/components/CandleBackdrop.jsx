import { useEffect, useMemo, useRef, useState } from 'react';

// Hintergrund für die Finance-Kachel: ein Candlestick-Chart wie im Trading-Terminal.
// Beim Hover zeichnet sich ein gleitender Durchschnitt, und ein Fadenkreuz rastet auf der Kerze unter dem Cursor ein.
// Erwartet eine Elternkarte mit der Klasse "group".

const STEP = 13;
const BODY = 7;
const MA = 8;

const mulberry32 = seed => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Fester Seed, damit der Chart bei jedem Besuch gleich aussieht. Leichter Aufwärtstrend.
function makeCandles(count) {
  const rand = mulberry32(7);
  const candles = [];
  let close = 100;
  for (let i = 0; i < count; i++) {
    const open = close;
    close = open * (1 + (rand() - 0.46) * 0.045);
    const high = Math.max(open, close) * (1 + rand() * 0.015);
    const low = Math.min(open, close) * (1 - rand() * 0.015);
    candles.push({ open, high, low, close });
  }
  return candles;
}

const ALL = makeCandles(140);

export default function CandleBackdrop() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(null);

  useEffect(() => {
    const el = ref.current;
    const card = el?.parentElement;
    if (!card) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    const onMove = e => {
      const rect = el.getBoundingClientRect();
      const i = Math.floor((e.clientX - rect.left) / STEP);
      setActive(i);
    };
    const onLeave = () => setActive(null);
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    return () => {
      ro.disconnect();
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const chart = useMemo(() => {
    const { w, h } = size;
    if (!w || !h) return null;
    const count = Math.ceil(w / STEP);
    const candles = ALL.slice(-count);
    const max = Math.max(...candles.map(c => c.high));
    const min = Math.min(...candles.map(c => c.low));
    // Oben Platz für den Text lassen, der Chart lebt in der unteren Hälfte
    const top = h * 0.5;
    const bottom = h - 16;
    const y = v => bottom - ((v - min) / (max - min)) * (bottom - top);
    const items = candles.map((c, i) => ({
      ...c,
      x: i * STEP + STEP / 2,
      yOpen: y(c.open),
      yClose: y(c.close),
      yHigh: y(c.high),
      yLow: y(c.low),
      up: c.close >= c.open
    }));
    const ma = items
      .map((c, i) => {
        if (i < MA - 1) return null;
        const avg = items.slice(i - MA + 1, i + 1).reduce((s, k) => s + k.close, 0) / MA;
        return `${c.x.toFixed(1)} ${y(avg).toFixed(1)}`;
      })
      .filter(Boolean);
    return { items, ma: `M${ma.join(' L')}` };
  }, [size]);

  const hovered = chart && active != null ? chart.items[active] : null;
  const first = chart?.items[0];
  const change = hovered && first ? (hovered.close / first.open - 1) * 100 : 0;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,rgb(0_0_0/0.35),black_60%)]"
    >
      {chart && (
        <svg width={size.w} height={size.h} className="absolute inset-0">
          {chart.items.map((c, i) => {
            const isActive = i === active;
            const color = c.up ? 'var(--signal)' : 'var(--bone)';
            return (
              <g
                key={i}
                className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : c.up ? 'opacity-20 group-hover:opacity-35' : 'opacity-12 group-hover:opacity-20'}`}
              >
                <line x1={c.x} x2={c.x} y1={c.yHigh} y2={c.yLow} stroke={color} strokeWidth="1" />
                <rect
                  x={c.x - BODY / 2}
                  y={Math.min(c.yOpen, c.yClose)}
                  width={BODY}
                  height={Math.max(1, Math.abs(c.yClose - c.yOpen))}
                  rx="1"
                  fill={c.up ? color : 'transparent'}
                  stroke={color}
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* Gleitender Durchschnitt: zeichnet sich beim Hover von links nach rechts */}
          <path
            d={chart.ma}
            pathLength="1"
            fill="none"
            stroke="var(--signal)"
            strokeWidth="1.5"
            strokeDasharray="1"
            className="[stroke-dashoffset:1] opacity-60 transition-[stroke-dashoffset] duration-[1400ms] ease-out group-hover:[stroke-dashoffset:0]"
          />

          {hovered && (
            <g className="font-mono text-[11px]">
              <line x1={hovered.x} x2={hovered.x} y1="0" y2={size.h} stroke="var(--bone)" strokeOpacity="0.25" strokeDasharray="3 4" />
              <line x1="0" x2={size.w} y1={hovered.yClose} y2={hovered.yClose} stroke="var(--bone)" strokeOpacity="0.25" strokeDasharray="3 4" />
              <rect x={size.w - 66} y={hovered.yClose - 10} width="66" height="20" fill="var(--signal)" />
              <text x={size.w - 33} y={hovered.yClose + 4} textAnchor="middle" fill="var(--ink)" fontWeight="600">
                {hovered.close.toFixed(2)}
              </text>
              <text
                x={Math.min(hovered.x + 8, size.w - 140)}
                y={size.h - 6}
                fill={change >= 0 ? 'var(--signal)' : 'var(--bone)'}
                fillOpacity="0.8"
              >
                {`${change >= 0 ? '+' : ''}${change.toFixed(2)}% seit Start`}
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
}
