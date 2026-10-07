import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lenis Smooth Scroll, synchronisiert mit GSAP ScrollTrigger. Bei Reduced Motion bleibt natives Scrollen.
export default function useSmoothScroll() {
  useEffect(() => {
    // Kein Smooth Scroll bei Reduced Motion und auf Touch-Geräten (natives Scrollen ist dort flüssiger)
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;

    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -56 } });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
