import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Link2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { format, useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';
import { useCopyText } from '../../hooks/useClipboard';
import { useModal } from '../../hooks/useModal';
import { projectUrl } from '../../hooks/useProjectRoute';
import { GitHubIcon } from '../Icons';
import { ProjectBadges, ProjectOrigin, TagList } from './ProjectBadges';
import { EmptyCover, Frame } from './ProjectCover';

function Gallery({ project }: { project: Project }) {
  const { t, l } = useI18n();
  const [index, setIndex] = useState(0);
  const { images } = project;
  const total = images.length;
  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  // Setas do teclado trocam a imagem (Esc e Tab ficam com o useModal)
  useEffect(() => {
    if (total < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [total]);

  if (total === 0) {
    return (
      <div className="gallery" style={{ '--project-accent': project.accent } as CSSProperties}>
        <div className="cover cover-modal"><EmptyCover project={project} /></div>
      </div>
    );
  }

  const image = images[index];

  return (
    <div className="gallery" style={{ '--project-accent': project.accent } as CSSProperties}>
      <div className="cover cover-modal">
        <Frame project={project}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={image.src}
              src={image.src}
              alt={`${project.name} — ${l(image.caption)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
        </Frame>

        {total > 1 && (
          <>
            <button type="button" className="gallery-nav is-prev" aria-label={t.slideshow.prev} onClick={() => go(-1)}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" className="gallery-nav is-next" aria-label={t.slideshow.next} onClick={() => go(1)}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="gallery-footer">
          <p className="gallery-caption" aria-live="polite">
            {l(image.caption)} <span>· {index + 1}/{total}</span>
          </p>
          <ul className="gallery-thumbs">
            {images.map((img, i) => (
              <li key={img.src}>
                <button
                  type="button"
                  className={`thumb${project.frame === 'app' ? ' is-portrait' : ''}`}
                  aria-label={format(t.slideshow.goTo, { n: i + 1, total })}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                >
                  <img src={img.src} alt="" loading="lazy" decoding="async" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, l } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const copyText = useCopyText();
  useModal(dialogRef, onClose);
  const titleId = `modal-title-${project.id}`;

  return (
    <div className="modal-root">
      <motion.div
        className="modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label={t.projects.close}>
          <X size={20} aria-hidden="true" />
        </button>

        <Gallery project={project} />

        <div className="modal-body">
          <div className="modal-main">
            <ProjectBadges project={project} showFeatured />
            <h2 id={titleId} className="modal-title">{project.name}</h2>
            <p className="modal-description">{l(project.description)}</p>
            <ProjectOrigin project={project} />

            <h3 className="modal-subtitle">{t.projects.highlights}</h3>
            <ul className="highlights">
              {project.highlights.map((h) => (
                <li key={h.pt}>
                  <Check size={16} aria-hidden="true" />
                  {l(h)}
                </li>
              ))}
            </ul>
          </div>

          <aside className="modal-aside">
            <h3 className="modal-subtitle">{t.projects.stack}</h3>
            <TagList tags={project.tags} />
            <div className="modal-actions">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {t.projects.viewLive}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <GitHubIcon size={18} />
                {t.projects.code}
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => copyText(projectUrl(project.id), t.projects.linkCopied)}
              >
                <Link2 size={18} aria-hidden="true" />
                {t.projects.copyLink}
              </button>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
