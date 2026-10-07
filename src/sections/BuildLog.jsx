import DecryptedText from '@/components/DecryptedText';
import { buildLog } from '@/content/site';

const typeStyle = {
  building: 'border-signal/40 text-signal',
  learning: 'border-line text-bone',
  experimenting: 'border-line text-bone-muted'
};

// Ruhiger Abschnitt im Changelog-Stil: woran ich gerade arbeite.
export default function BuildLog() {
  return (
    <section id="log" className="relative mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <h2 className="font-wide text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95] font-black tracking-tight uppercase">
              {buildLog.title}
            </h2>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-bone-muted">{buildLog.text}</p>
          </div>
        </div>

        <ol className="md:col-span-8">
          {buildLog.entries.map(entry => (
            <li
              key={entry.title}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line py-7 font-mono md:grid-cols-[90px_150px_1fr]"
            >
              <time className="text-[13px] text-bone-muted" dateTime={entry.date}>
                {entry.date.replace('-', '.')}
              </time>
              <span
                className={`h-fit w-fit rounded-full border px-2.5 py-0.5 text-[11px] tracking-wide uppercase ${typeStyle[entry.type]}`}
              >
                {entry.type}
              </span>
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-sans text-xl font-medium text-bone">
                  <DecryptedText
                    text={entry.title}
                    animateOn="view"
                    sequential
                    speed={35}
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_"
                    encryptedClassName="text-bone-muted"
                  />
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-bone-muted">{entry.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
