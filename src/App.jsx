import Nav from '@/components/Nav';
import Noise from '@/components/Noise';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import About from '@/sections/About';
import BuildLog from '@/sections/BuildLog';
import Capabilities from '@/sections/Capabilities';
import Contact from '@/sections/Contact';
import Hero from '@/sections/Hero';
import Personal from '@/sections/Personal';
import Research from '@/sections/Research';
import TechFinance from '@/sections/TechFinance';
import Work from '@/sections/Work';

// Rhythmus: laut, ruhig, laut, ruhig, laut, ruhig, mittel, ruhig bis laut.
export default function App() {
  useSmoothScroll();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Capabilities />
        <TechFinance />
        <Research />
        <BuildLog />
        <Personal />
      </main>
      <Contact />
      {/* Grain nur auf dem Desktop: ein vollflächiges Overlay kostet auf dem Handy beim Scrollen spürbar Leistung */}
      <div className="pointer-events-none fixed inset-0 z-50 hidden md:block" aria-hidden="true">
        <Noise patternAlpha={8} patternRefreshInterval={0} />
      </div>
    </>
  );
}
