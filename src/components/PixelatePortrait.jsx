import { useEffect, useRef } from 'react';

// Normales Foto. Unter dem Cursor wird es verpixelt (Mosaik in den Originalfarben) und klingt danach wieder ab.
// Reines Canvas 2D: das Mosaik ist das Originalbild klein gerechnet und ohne Glättung hochskaliert.
export default function PixelatePortrait({ src, alt, blockSize = 14, radius = 170, linger = 0.9, className = '' }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mosaic = document.createElement('canvas');
    const mosaicCtx = mosaic.getContext('2d');
    const small = document.createElement('canvas');
    const smallCtx = small.getContext('2d');
    const mask = document.createElement('canvas');
    const maskCtx = mask.getContext('2d');
    const layer = document.createElement('canvas');
    const layerCtx = layer.getContext('2d');

    const img = new Image();
    let ready = false;
    let raf = 0;
    let last = 0;
    let dpr = 1;
    const pointer = { x: 0, y: 0, inside: false, px: null, py: null };

    // Bild wie object-fit: cover in die Fläche legen
    const cover = (w, h) => {
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      return [(w - dw) / 2, (h - dh) / 2, dw, dh];
    };

    const layout = () => {
      if (!ready) return;
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      for (const c of [canvas, mosaic, mask, layer]) {
        c.width = w;
        c.height = h;
      }
      // Mosaik vorberechnen: klein rechnen, dann ohne Glättung hochskalieren
      const block = Math.max(2, Math.round(blockSize * dpr));
      small.width = Math.ceil(w / block);
      small.height = Math.ceil(h / block);
      const [sx, sy, sw, sh] = cover(small.width, small.height);
      smallCtx.imageSmoothingEnabled = true;
      smallCtx.clearRect(0, 0, small.width, small.height);
      smallCtx.drawImage(img, sx, sy, sw, sh);
      mosaicCtx.imageSmoothingEnabled = false;
      mosaicCtx.clearRect(0, 0, w, h);
      mosaicCtx.drawImage(small, 0, 0, small.width * block, small.height * block);
      render();
    };

    const render = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, ...cover(w, h));
      // Mosaik nur dort, wo die Maske gesetzt ist
      layerCtx.globalCompositeOperation = 'source-over';
      layerCtx.clearRect(0, 0, w, h);
      layerCtx.drawImage(mosaic, 0, 0);
      layerCtx.globalCompositeOperation = 'destination-in';
      layerCtx.drawImage(mask, 0, 0);
      ctx.drawImage(layer, 0, 0);
    };

    const stamp = (x, y) => {
      const r = radius * dpr;
      const g = maskCtx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(0.6, 'rgba(0,0,0,0.9)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      maskCtx.fillStyle = g;
      maskCtx.beginPath();
      maskCtx.arc(x, y, r, 0, Math.PI * 2);
      maskCtx.fill();
    };

    const frame = now => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;

      // Maske langsam ausblenden
      maskCtx.globalCompositeOperation = 'destination-out';
      maskCtx.fillStyle = `rgba(0,0,0,${Math.min(1, dt / Math.max(0.05, linger))})`;
      maskCtx.fillRect(0, 0, mask.width, mask.height);
      maskCtx.globalCompositeOperation = 'source-over';

      if (pointer.inside) {
        // Zwischen letzter und aktueller Position interpolieren, damit schnelle Bewegungen lückenlos sind
        const fromX = pointer.px ?? pointer.x;
        const fromY = pointer.py ?? pointer.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(pointer.x - fromX, pointer.y - fromY) / (radius * dpr * 0.25)));
        for (let i = 1; i <= steps; i++) stamp(fromX + ((pointer.x - fromX) * i) / steps, fromY + ((pointer.y - fromY) * i) / steps);
        pointer.px = pointer.x;
        pointer.py = pointer.y;
      }

      render();

      // Weiterlaufen, solange die Maus drin ist oder noch etwas nachklingt
      const alive = pointer.inside || hasMask();
      if (alive) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    let checkCounter = 0;
    const hasMask = () => {
      // nur gelegentlich prüfen (getImageData ist teuer)
      if (++checkCounter % 15) return true;
      const sample = maskCtx.getImageData(0, 0, mask.width, mask.height).data;
      for (let i = 3; i < sample.length; i += 64) if (sample[i] > 2) return true;
      maskCtx.clearRect(0, 0, mask.width, mask.height);
      return false;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = e => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) * dpr;
      pointer.y = (e.clientY - rect.top) * dpr;
      if (!pointer.inside) {
        pointer.inside = true;
        pointer.px = null;
        pointer.py = null;
      }
      wake();
    };
    const onLeave = () => {
      pointer.inside = false;
      wake();
    };

    img.onload = () => {
      ready = true;
      layout();
    };
    img.src = src;

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(wrap);
    wrap.addEventListener('pointermove', onMove, { passive: true });
    wrap.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, [src, blockSize, radius, linger]);

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" role="img" aria-label={alt} />
    </div>
  );
}
