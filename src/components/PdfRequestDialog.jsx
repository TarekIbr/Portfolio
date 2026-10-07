import { Dialog } from 'radix-ui';
import { EnvelopeSimple, FilePdf, X } from '@phosphor-icons/react';
import { contact } from '@/content/site';

const mail = contact.links.find(l => l.href.startsWith('mailto:'))?.href.replace('mailto:', '');

// Popup statt Download: PDFs gibt es vorerst nur auf Anfrage.
// children ist der Auslöser (Button), paper liefert den Titel für die Mail-Vorlage.
export default function PdfRequestDialog({ paper, children }) {
  const subject = encodeURIComponent(`Anfrage PDF: ${paper.title}`);
  const body = encodeURIComponent(`Hallo Tarek,\n\nich würde gerne das PDF zu „${paper.title}“ lesen.\n\nViele Grüße`);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          data-lenis-prevent
          className="fixed top-1/2 left-1/2 z-[101] w-[calc(100%-32px)] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-line bg-ink-raised p-7 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:p-8"
        >
          <Dialog.Close
            className="absolute top-4 right-4 rounded-full p-2 text-bone-muted transition-colors duration-200 hover:bg-ink hover:text-bone"
            aria-label="Schließen"
          >
            <X size={16} weight="bold" />
          </Dialog.Close>

          <div className="flex items-center gap-3 font-mono text-[12px] text-bone-muted">
            <span className="grid size-9 place-items-center rounded-full border border-signal/40 text-signal">
              <FilePdf size={18} />
            </span>
            <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] tracking-wide uppercase">
              Auf Anfrage
            </span>
          </div>

          <Dialog.Title className="mt-5 text-xl font-medium text-bone">Download gerade nicht möglich</Dialog.Title>
          <Dialog.Description className="mt-3 text-[15px] leading-relaxed text-bone-muted">
            Aus technischen Gründen kann ich das PDF momentan nicht direkt zum Download anbieten. Auf Anfrage schicke ich
            es dir aber gerne zu.
          </Dialog.Description>

          <p className="mt-4 border-l-2 border-signal/50 pl-3 text-[13px] leading-snug text-bone">{paper.title}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {mail && (
              <a
                href={`mailto:${mail}?subject=${subject}&body=${body}`}
                className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-[14px] font-medium text-ink transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]"
              >
                <EnvelopeSimple size={16} weight="bold" />
                PDF anfragen
              </a>
            )}
            <Dialog.Close className="rounded-full border border-line px-4 py-2 text-[14px] text-bone transition-colors duration-200 hover:border-bone/40">
              Schließen
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
