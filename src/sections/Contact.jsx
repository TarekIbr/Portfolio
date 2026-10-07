import { ArrowUpRight } from '@phosphor-icons/react';
import TextPressure from '@/components/TextPressure';
import Ticker from '@/components/Ticker';
import { contact, person } from '@/content/site';
import useLiteMode from '@/hooks/useLiteMode';

const year = new Date().getFullYear();

// Abschluss: ruhig mit den Links, dann zum Schluss noch einmal laut.
export default function Contact() {
  const lite = useLiteMode();

  return (
    <footer id="kontakt" className="relative pt-24 md:pt-36">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-4 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <h2 className="font-wide text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-black tracking-tight uppercase">
            {contact.title}
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-bone-muted">{contact.text}</p>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <ul className="border-b border-line">
            {contact.links.map(link => {
              const external = link.href.startsWith('http');
              return (
                <li key={link.label} className="border-t border-line">
                  <a
                    href={link.href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-center justify-between py-5 text-2xl font-medium tracking-tight transition-colors duration-200 hover:text-signal focus-visible:text-signal md:text-4xl"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={28}
                      className="text-bone-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Ticker className="mt-24 md:mt-28" />

      {lite ? (
        // Handy: statische Version, ohne Dauerschleife
        <p className="font-narrow px-4 pt-8 text-center text-[15.5vw] leading-none font-light whitespace-nowrap text-bone uppercase">
          {contact.outro}
        </p>
      ) : (
        <div className="h-[15vw] max-h-[240px] min-h-[90px] w-full px-2 pt-8">
          <TextPressure
            text={contact.outro}
            fontFamily="Archivo Variable"
            fontUrl=""
            italic={false}
            textColor="#edebe6"
            minFontSize={40}
          />
        </div>
      )}

      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-6 font-mono text-[12px] text-bone-muted md:px-8">
        <span>
          © {year} {person.firstName}
        </span>
        <a href="#top" className="transition-colors hover:text-bone">
          Nach oben
        </a>
      </div>
    </footer>
  );
}
