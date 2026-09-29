import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';

interface FrameProps {
  project: Project;
  children: ReactNode;
}

/** Moldura de navegador (sites) ou janela vertical (app/jogo). O layoutId liga a capa do card à galeria do modal. */
export function Frame({ project, children }: FrameProps) {
  return (
    <motion.div
      layoutId={`frame-${project.id}`}
      className={`frame frame-${project.frame}`}
      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
    >
      {project.frame === 'browser' && (
        <div className="frame-bar" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      )}
      <div className="frame-screen">{children}</div>
    </motion.div>
  );
}

/** Capa sem imagem: ícone do projeto + nome sobre a cor de destaque */
export function EmptyCover({ project }: { project: Project }) {
  const { t } = useI18n();
  const Icon = project.icon;
  return (
    <div className="empty-cover">
      <Icon size={36} strokeWidth={1.5} aria-hidden="true" />
      <span className="empty-cover-name">{project.name}</span>
      <span className="empty-cover-note">{t.projects.noImages}</span>
    </div>
  );
}

export function ProjectCover({ project }: { project: Project }) {
  const { l } = useI18n();
  const cover = project.images[0];

  return (
    <div className="cover" style={{ '--project-accent': project.accent } as CSSProperties}>
      {cover ? (
        <Frame project={project}>
          <img
            src={cover.src}
            alt={`${project.name} — ${l(cover.caption)}`}
            loading="lazy"
            decoding="async"
          />
        </Frame>
      ) : (
        <EmptyCover project={project} />
      )}
    </div>
  );
}
