import { useEffect, useRef } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

export function Lightbox({ images, index, onChange, onClose }: LightboxProps) {
  const { t } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null && images.length > 0;
  const total = images.length;
  const current = index ?? 0;

  // Ao abrir: trava o scroll e move o foco; ao fechar, devolve o foco para onde estava
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onChange((current - 1 + total) % total);
      if (e.key === 'ArrowRight') onChange((current + 1) % total);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, current, total, onChange, onClose]);

  const image = open ? images[current] : null;
  const multi = total > 1;

  return (
    <div
      className={`lightbox${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={t.a11y.lightboxDialog}
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button ref={closeRef} type="button" className="lightbox-close" aria-label={t.a11y.lightboxClose} onClick={onClose} tabIndex={open ? 0 : -1}>&times;</button>
      {open && multi && (
        <button type="button" className="lightbox-nav lightbox-prev" aria-label={t.slideshow.prev} onClick={() => onChange((current - 1 + total) % total)}>&#8249;</button>
      )}
      {image && <img src={image.src} alt={image.alt} />}
      {open && multi && (
        <button type="button" className="lightbox-nav lightbox-next" aria-label={t.slideshow.next} onClick={() => onChange((current + 1) % total)}>&#8250;</button>
      )}
    </div>
  );
}
