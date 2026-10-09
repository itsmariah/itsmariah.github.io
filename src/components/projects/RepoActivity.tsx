import { useRef } from 'react';
import { useInView } from 'motion/react';
import { format, useI18n, type Lang } from '../../i18n/I18nProvider';
import { useRepoActivity } from '../../hooks/useRepoActivity';

const DAY_S = 86_400;
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * DAY_S],
  ['month', 30 * DAY_S],
  ['week', 7 * DAY_S],
  ['day', DAY_S],
  ['hour', 3_600],
  ['minute', 60],
];

/** "há 3 dias" / "3 days ago", "ontem" / "yesterday"… */
function relativeTime(iso: string, lang: Lang) {
  const seconds = (Date.parse(iso) - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang === 'pt' ? 'pt-BR' : 'en', { numeric: 'auto' });
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return rtf.format(0, 'second');
}

/**
 * "Atualizado há 2 dias", a partir do último push no GitHub. Só busca quando chega perto da tela;
 * o elemento existe desde o início (com altura reservada) para nada pular quando o dado chega.
 */
export function RepoActivity({ repoUrl }: { repoUrl: string }) {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLParagraphElement>(null);
  const nearViewport = useInView(ref, { once: true, margin: '300px' });
  const pushedAt = useRepoActivity(repoUrl, nearViewport);

  const recent = pushedAt !== null && Date.now() - Date.parse(pushedAt) < 7 * DAY_S * 1000;

  return (
    <p ref={ref} className={`repo-activity${pushedAt ? ' is-ready' : ''}${recent ? ' is-recent' : ''}`}>
      {pushedAt && (
        <>
          <span className="repo-activity-dot" aria-hidden="true" />
          <time dateTime={pushedAt}>{format(t.projects.updated, { when: relativeTime(pushedAt, lang) })}</time>
        </>
      )}
    </p>
  );
}
