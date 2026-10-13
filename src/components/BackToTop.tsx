import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { useScrollFrame, useScrolledPast } from '../hooks/useScroll';

export function BackToTop() {
  const { t } = useI18n();
  const visible = useScrolledPast(600);

  // Anel de progresso: atualizado direto no DOM, como a barra da navbar
  const ringRef = useRef<SVGCircleElement>(null);
  useScrollFrame((_, progress) => {
    ringRef.current?.style.setProperty('stroke-dashoffset', String(1 - progress));
  });

  return (
    <a
      href="#"
      className={`back-to-top${visible ? ' visible' : ''}`}
      aria-label={t.a11y.backToTop}
      tabIndex={visible ? undefined : -1}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <svg className="back-to-top-ring" viewBox="0 0 44 44" aria-hidden="true">
        <defs>
          <linearGradient id="back-to-top-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" className="ring-stop-1" />
            <stop offset="50%" className="ring-stop-2" />
            <stop offset="100%" className="ring-stop-3" />
          </linearGradient>
        </defs>
        <circle ref={ringRef} cx="22" cy="22" r="21" pathLength={1} stroke="url(#back-to-top-gradient)" />
      </svg>
      <ArrowUp size={20} aria-hidden="true" />
    </a>
  );
}
