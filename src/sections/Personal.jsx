import { useReducedMotion } from 'motion/react';
import TiltedCard from '@/components/TiltedCard';
import { personal } from '@/content/site';
import useLiteMode from '@/hooks/useLiteMode';

// Asymmetrische Collage: jede Kachel hat ihre eigene Breite und ihren eigenen Versatz.
const layout = ['md:col-span-4', 'md:col-span-8 md:mt-24', 'md:col-span-3', 'md:col-span-5 md:mt-16', 'md:col-span-4 md:-mt-24'];

function Photo({ item, reduce }) {
  const ratio = { aspectRatio: `${item.w} / ${item.h}` };
  if (reduce) {
    return (
      <img
        src={item.image}
        alt={item.title}
        width={item.w}
        height={item.h}
        loading="lazy"
        className="w-full rounded-[20px] object-cover"
        style={ratio}
      />
    );
  }
  return (
    <div style={ratio}>
      <TiltedCard
        imageSrc={item.image}
        altText={item.title}
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        scaleOnHover={1.04}
        rotateAmplitude={8}
        showMobileWarning={false}
        showTooltip={false}
      />
    </div>
  );
}

export default function Personal() {
  const reducedMotion = useReducedMotion();
  const lite = useLiteMode();
  const reduce = reducedMotion || lite;

  return (
    <section id="mehr-als-code" className="relative mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-wide text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-black tracking-tight uppercase">
          {personal.title}
        </h2>
        <p className="font-narrow text-outline text-[clamp(2rem,5vw,4.5rem)] leading-none font-extrabold uppercase md:pb-2">
          {personal.statement}
        </p>
      </div>

      <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-12 md:gap-y-20">
        {personal.items.map((item, i) => (
          <li key={item.title} className={layout[i] ?? 'md:col-span-4'}>
            <Photo item={item} reduce={reduce} />
            <h3 className="mt-5 font-mono text-[12px] tracking-wide text-bone-muted uppercase">{item.title}</h3>
            <p className="mt-1.5 max-w-[40ch] text-[15px] leading-relaxed text-bone">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
