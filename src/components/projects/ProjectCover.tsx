import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';

interface FrameProps {
  project: Project;
  children: ReactNode;
}

/** Moldura de navegador (sites) ou janela vertical (app/jogo). O layoutId liga a capa do card à galeria do modal. */
export function Frame({ project, children }: FrameProps) {
  return (
    <m.div
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
    </m.div>
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

const PREVIEW_INTERVAL_MS = 1300;

/**
 * Capa do projeto. Com `playing` (mouse sobre o card), passa pelas outras imagens da galeria
 * como uma prévia. Elas só são baixadas no primeiro hover e ficam empilhadas sobre a capa,
 * então uma imagem ainda carregando nunca deixa a moldura vazia.
 */
export function ProjectCover({ project, playing = false }: { project: Project; playing?: boolean }) {
  const { l } = useI18n();
  const reduceMotion = useReducedMotion();
  const [cover, ...rest] = project.images;
  const canPreview = rest.length > 0 && !reduceMotion;
  const [warm, setWarm] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing || !canPreview) return;
    setWarm(true);
    const timer = setInterval(() => setIndex((i) => (i + 1) % project.images.length), PREVIEW_INTERVAL_MS);
    return () => {
      clearInterval(timer);
      setIndex(0);
    };
  }, [playing, canPreview, project.images.length]);

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
          {warm && rest.map((image, i) => (
            <img
              key={image.src}
              className={`cover-preview${index === i + 1 ? ' is-active' : ''}`}
              src={image.src}
              alt=""
              decoding="async"
            />
          ))}
        </Frame>
      ) : (
        <EmptyCover project={project} />
      )}

      {canPreview && (
        <span className={`cover-dots${playing ? ' is-visible' : ''}`} aria-hidden="true">
          {project.images.map((image, i) => (
            <span key={image.src} className={i === index ? 'is-active' : undefined} />
          ))}
        </span>
      )}
    </div>
  );
}
