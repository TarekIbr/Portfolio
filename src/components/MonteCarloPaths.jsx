import { useEffect, useRef } from 'react';

// Monte-Carlo-Simulation von Kurspfaden (geometrische Brownsche Bewegung).
// Die Pfade zeichnen sich einmal, wenn die Fläche ins Bild kommt, und bleiben danach stehen.
// Der Seed ist fest, damit die Grafik bei jedem Besuch gleich aussieht.

const mulberry32 = seed => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Box-Muller: Standardnormalverteilte Zufallszahl
const gaussian = rand => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());

function simulate({ paths, steps, mu, sigma, seed }) {
  const rand = mulberry32(seed);
  const dt = 1 / steps;
  const result = [];
  for (let p = 0; p < paths; p++) {
    const series = [1];
    for (let i = 1; i <= steps; i++) {
      const prev = series[i - 1];
      series.push(prev * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * gaussian(rand)));
    }
    result.push(series);
  }
  // Pfad mit dem mittleren Endwert hervorheben
  const order = result.map((s, i) => [s[steps], i]).sort((a, b) => a[0] - b[0]);
  return { result, median: order[Math.floor(order.length / 2)][1] };
}

export default function MonteCarloPaths({
  paths = 48,
  steps = 240,
  mu = 0.08,
  sigma = 0.32,
  seed = 7,
  duration = 2200,
  className = ''
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { result, median } = simulate({ paths, steps, mu, sigma, seed });
    const all = result.flat();
    const lo = Math.min(...all);
    const hi = Math.max(...all);
    // Reduced Motion oder Handy: sofort fertig zeichnen, keine Animation
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)').matches;

    let progress = reduce ? 1 : 0;
    let started = reduce;
    let raf = 0;
    let startTime = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const pad = h * 0.08;
      const x = i => (i / steps) * w;
      const y = v => h - pad - ((Math.log(v) - Math.log(lo)) / (Math.log(hi) - Math.log(lo))) * (h - 2 * pad);
      const upto = Math.max(1, Math.floor(progress * steps));

      const line = (series, color, width) => {
        ctx.beginPath();
        ctx.moveTo(x(0), y(series[0]));
        for (let i = 1; i <= upto; i++) ctx.lineTo(x(i), y(series[i]));
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
      };

      result.forEach((series, i) => {
        if (i !== median) line(series, 'rgba(237, 235, 230, 0.13)', 1);
      });
      line(result[median], '#3dff8a', 1.75);

      // Startwert als Referenzlinie
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(0, y(1));
      ctx.lineTo(w, y(1));
      ctx.strokeStyle = 'rgba(237, 235, 230, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const tick = now => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / duration);
      progress = 1 - Math.pow(1 - t, 3);
      draw();
      raf = t < 1 ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => draw());
    resizeObserver.observe(canvas);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [paths, steps, mu, sigma, seed, duration]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
