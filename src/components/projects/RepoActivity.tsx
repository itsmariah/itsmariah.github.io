import { useRef } from 'react';
import { useInView } from 'motion/react';
import { format, useI18n } from '../../i18n/I18nProvider';
import { useRepoActivity } from '../../hooks/useRepoActivity';
import { relativeTime } from '../../utils/relativeTime';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * "Atualizado há 2 dias", a partir do último push no GitHub. Só busca quando chega perto da tela;
 * o elemento existe desde o início (com altura reservada) para nada pular quando o dado chega.
 */
export function RepoActivity({ repoUrl }: { repoUrl: string }) {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLParagraphElement>(null);
  const nearViewport = useInView(ref, { once: true, margin: '300px' });
  const pushedAt = useRepoActivity(repoUrl, nearViewport);

  const recent = pushedAt !== null && Date.now() - Date.parse(pushedAt) < WEEK_MS;

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
