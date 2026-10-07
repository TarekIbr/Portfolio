// Echter Projektstatus als kleines Mono-Label. Nur "live" bekommt die Signalfarbe.
export default function StatusTag({ status, className = '' }) {
  const live = status === 'live';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide uppercase ${
        live ? 'border-signal/40 text-signal' : 'border-line text-bone-muted'
      } ${className}`}
    >
      {live && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
        </span>
      )}
      {status}
    </span>
  );
}
