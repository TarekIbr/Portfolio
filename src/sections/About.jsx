import ScrollReveal from '@/components/ScrollReveal';
import { about } from '@/content/site';
import useLiteMode from '@/hooks/useLiteMode';

// Ruhiger Abschnitt: großer Fließtext, der beim Scrollen scharf wird, daneben kurze Fakten.
export default function About() {
  const lite = useLiteMode();

  return (
    <section id="ueber-mich" className="relative mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-44">
      <div className="grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <h2 className="mb-8 text-[15px] text-bone-muted">{about.title}</h2>
          <ScrollReveal
            baseOpacity={0.12}
            baseRotation={2}
            blurStrength={6}
            enableBlur={!lite}
            containerClassName="my-0"
            textClassName="!text-[clamp(1.6rem,3.4vw,3rem)] !leading-[1.25] !font-medium tracking-tight text-bone"
            wordAnimationEnd="bottom 55%"
          >
            {about.text}
          </ScrollReveal>
        </div>

        <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-8 font-mono text-[13px] md:col-span-3 md:col-start-10 md:grid-cols-1 md:pt-16">
          {about.facts.map(fact => (
            <div key={fact.label} className="border-t border-line pt-3">
              <dt className="text-[11px] tracking-wide text-bone-muted uppercase">{fact.label}</dt>
              <dd className="mt-1 text-bone">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="font-narrow mt-24 text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.9] font-extrabold tracking-tight uppercase md:mt-32 md:text-right">
        {about.signature.split(' ').map((word, i) => (
          <span key={word} className={i === 2 ? 'text-bone' : 'text-outline'}>
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}
