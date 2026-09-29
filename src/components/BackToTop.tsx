import { ArrowUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { useScrolledPast } from '../hooks/useScroll';

export function BackToTop() {
  const { t } = useI18n();
  const visible = useScrolledPast(600);

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
      <ArrowUp size={20} aria-hidden="true" />
    </a>
  );
}
