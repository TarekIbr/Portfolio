import { useEffect, useRef, useState } from 'react';

// Mountet teure WebGL-Komponenten erst, wenn sie in die Nähe des Viewports kommen,
// und gibt sie wieder frei, sobald sie weit genug weg sind. So laufen nie zu viele Canvas gleichzeitig.
export default function LazyMount({ children, fallback = null, rootMargin = '300px 0px', className = '', style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {visible ? children : fallback}
    </div>
  );
}
