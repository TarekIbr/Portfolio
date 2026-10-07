import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// LaTeX-Formel, gerendert mit KaTeX (statisches HTML, kein Laufzeit-Layout).
export default function Tex({ tex, display = false, className = '' }) {
  const html = useMemo(
    () => katex.renderToString(tex, { displayMode: display, throwOnError: false, output: 'htmlAndMathml' }),
    [tex, display]
  );
  const Tag = display ? 'div' : 'span';
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
