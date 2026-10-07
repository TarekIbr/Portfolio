import { ArrowRight } from '@phosphor-icons/react';
import CandleBackdrop from '@/components/CandleBackdrop';
import CodeBackdrop from '@/components/CodeBackdrop';
import PipelineBackdrop from '@/components/PipelineBackdrop';
import PixelCard from '@/components/PixelCard';
import SpotlightCard from '@/components/SpotlightCard';
import { capabilities } from '@/content/site';

const area = key => capabilities.areas.find(a => a.key === key);

function ToolChips({ tools, large = false }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tools.map(tool => (
        <li
          key={tool.name}
          className={`inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 font-mono text-bone-muted ${
            large ? 'px-3.5 py-2 text-[13px]' : 'px-3 py-1.5 text-[12px]'
          }`}
        >
          <img
            src={`https://cdn.simpleicons.org/${tool.icon}/edebe6`}
            alt=""
            width={large ? 16 : 14}
            height={large ? 16 : 14}
            loading="lazy"
            className="opacity-80"
          />
          {tool.name}
        </li>
      ))}
    </ul>
  );
}

function AreaText({ data, big = false }) {
  return (
    <div>
      <h3
        className={`font-wide font-extrabold tracking-tight uppercase ${big ? 'text-[clamp(1.6rem,6vw,2.5rem)]' : 'text-[clamp(1.4rem,6vw,1.875rem)]'}`}
      >
        {data.title}
      </h3>
      <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-bone-muted">{data.text}</p>
    </div>
  );
}

const cardBase = '!rounded-[20px] !border-line !bg-ink-raised !p-6 md:!p-8';
const spot = 'rgba(61, 255, 138, 0.10)';

// Ruhig/mittel: vier große Bereiche statt Skill-Liste, jeweils mit den Tools dazu.
export default function Capabilities() {
  const dev = area('development');
  const products = area('products');
  const finance = area('finance');
  const automation = area('automation');

  return (
    <section id="was-ich-mache" className="relative mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
      <p className="text-[15px] text-bone-muted">{capabilities.title}</p>
      <h2 className="font-wide mt-3 text-[clamp(2.4rem,5.6vw,5.25rem)] leading-[0.95] font-black tracking-tight uppercase">
        {capabilities.statement}
      </h2>
      <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-bone-muted">{capabilities.statementText}</p>

      <ol
        className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-3 font-mono text-[13px] text-bone"
        aria-label="Wie ich Projekte umsetze"
      >
        {capabilities.process.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="rounded-full border border-line px-3.5 py-1.5">{step}</span>
            {i < capabilities.process.length - 1 && (
              <ArrowRight size={14} weight="bold" className="text-bone-muted" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 md:grid-cols-12">
        {/* Development: die große Kachel, Code als Hintergrund */}
        <SpotlightCard
          className={`${cardBase} group flex min-h-[230px] flex-col justify-between md:col-span-7`}
          spotlightColor={spot}
        >
          <CodeBackdrop />
          <div className="relative">
            <AreaText data={dev} big />
          </div>
          <div className="relative mt-6">
            <ToolChips tools={dev.tools} large />
          </div>
        </SpotlightCard>

        {/* Eigene Produkte: Pixel-Reveal beim Hover */}
        <PixelCard
          colors="#1d1d20,#2a2a2e,#3dff8a"
          gap={6}
          speed={30}
          className="!aspect-auto !h-full min-h-[230px] !w-full !rounded-[20px] !border-line bg-ink-raised md:col-span-5"
        >
          <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
            <AreaText data={products} />
            <ToolChips tools={products.tools} />
          </div>
        </PixelCard>

        {/* Finance: Candlestick-Chart mit Fadenkreuz als Hintergrund */}
        <SpotlightCard
          className={`${cardBase} group relative flex min-h-[230px] flex-col justify-between md:col-span-5`}
          spotlightColor={spot}
        >
          <CandleBackdrop />
          <div className="relative">
            <AreaText data={finance} />
          </div>
          <div className="relative mt-6">
            <ToolChips tools={finance.tools} />
          </div>
        </SpotlightCard>

        {/* Automation: zweite Reihe, breiter, Workflow-Graph als Hintergrund */}
        <SpotlightCard
          className={`${cardBase} group flex min-h-[230px] flex-col justify-between gap-6 md:col-span-7`}
          spotlightColor={spot}
        >
          <PipelineBackdrop />
          <div className="relative">
            <AreaText data={automation} />
          </div>
          <div className="relative">
            <ToolChips tools={automation.tools} large />
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
