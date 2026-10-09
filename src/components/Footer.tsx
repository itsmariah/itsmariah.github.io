import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { shortcutLabel } from './CommandPalette';

// João Pessoa segue o horário de Fortaleza (UTC−3, sem horário de verão)
const TIME_ZONE = 'America/Fortaleza';

function LocalTime() {
  const { t, lang } = useI18n();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const time = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  }).format(now);

  return (
    <p className="footer-time">
      <span className="status-dot" aria-hidden="true"></span>
      {t.footer.localTime} · <time>{time}</time>
    </p>
  );
}

export function Footer() {
  const { t } = useI18n();
  const [before, after] = t.footer.tip.split('{key}');

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {t.footer.text}</p>
        <LocalTime />
        <p>{t.footer.built}</p>
      </div>
      {/* Atalho só faz sentido com teclado físico; o CSS esconde em telas de toque */}
      <p className="container footer-tip">
        {before}<kbd className="kbd">{shortcutLabel}</kbd>{after}
      </p>
    </footer>
  );
}
