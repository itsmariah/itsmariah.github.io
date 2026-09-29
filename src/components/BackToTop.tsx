import { useRef } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { useScrolledPast, useScrollFrame } from '../hooks/useScroll';

const RING_CIRCUMFERENCE = 2 * Math.PI * 19;

export function BackToTop() {
  const { t } = useI18n();
  const visible = useScrolledPast(400);
  const ringRef = useRef<SVGCircleElement>(null);

  useScrollFrame((_, progress) => {
    if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - progress));
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
        <circle className="ring-track" cx="22" cy="22" r="19"></circle>
        <circle className="ring-fill" ref={ringRef} cx="22" cy="22" r="19"></circle>
      </svg>
      <span className="back-to-top-arrow" aria-hidden="true">↑</span>
    </a>
  );
}
