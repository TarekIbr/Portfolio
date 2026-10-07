import { ticker } from '@/content/site';

// Börsenband mit dem, woran ich gerade arbeite. Einziger Marquee der Seite.
export default function Ticker({ className = '' }) {
  const row = (hidden = false) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ticker.map(item => (
        <li key={item.symbol} className="flex items-center gap-2 px-6 whitespace-nowrap">
          <span className="text-bone">{item.symbol}</span>
          <span className="text-signal" aria-hidden="true">
            ▲
          </span>
          <span className="text-bone-muted">{item.value}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`relative overflow-hidden border-y border-line bg-ink py-2.5 font-mono text-[12px] tracking-wide uppercase md:bg-ink/80 md:backdrop-blur-sm ${className}`}
      aria-label="Woran ich gerade arbeite"
    >
      <div className="animate-ticker flex w-max">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
