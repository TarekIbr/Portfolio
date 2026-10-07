import { motion, useReducedMotion, useTransform } from 'motion/react';
import PixelatePortrait from '@/components/PixelatePortrait';
import useLiteMode from '@/hooks/useLiteMode';

// Portrait als digitales Objekt: normales Foto in Farbe, unter dem Cursor wird es verpixelt.
// tiltX / tiltY sind Motion Values (-1 bis 1) aus dem Hero, damit Portrait und Typo gemeinsam reagieren.
export default function InteractivePortrait({ portrait, alt, tiltX, tiltY, className = '' }) {
  const reduce = useReducedMotion();
  // Auf Touch-Geräten gibt es kein Kippen, daher auch keine teure 3D-Ebene
  const lite = useLiteMode();
  const rotateY = useTransform(tiltX, v => v * 2);
  const rotateX = useTransform(tiltY, v => v * -1.5);

  // Freigestelltes Bild: Silhouette über die eigene Alpha-Maske. Platzhalter-Foto: weich ausgeblendete Ränder.
  const mask = portrait.cutout
    ? `url(${portrait.src}) center / 100% 100% no-repeat`
    : 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 48%, rgb(0 0 0 / 0.65) 70%, rgb(0 0 0 / 0.22) 86%, transparent 100%)';

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        aspectRatio: `${portrait.width} / ${portrait.height}`,
        ...(reduce || lite ? {} : { rotateX, rotateY, transformPerspective: 1200 }),
        mask,
        WebkitMask: mask
      }}
    >
      {reduce ? (
        <img
          src={portrait.src}
          alt={alt}
          width={portrait.width}
          height={portrait.height}
          className="h-full w-full object-cover"
        />
      ) : (
        <PixelatePortrait src={portrait.src} alt={alt} blockSize={14} radius={170} linger={0.9} />
      )}
    </motion.div>
  );
}
