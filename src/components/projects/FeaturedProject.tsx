import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { m } from 'motion/react';
import { useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';
import { useTilt } from '../../hooks/useTilt';
import { GitHubIcon } from '../Icons';
import { ProjectBadges, ProjectOrigin, TagList } from './ProjectBadges';
import { ProjectCover } from './ProjectCover';
import { RepoActivity } from './RepoActivity';

interface FeaturedProjectProps {
  project: Project;
  reversed: boolean;
  onOpen: () => void;
}

export function FeaturedProject({ project, reversed, onOpen }: FeaturedProjectProps) {
  const { t, l } = useI18n();
  const { rotateX, rotateY, handlers } = useTilt(3.5);
  // Mouse sobre a capa: ela passa pelas imagens da galeria
  const [hovered, setHovered] = useState(false);

  return (
    <m.article
      className={`feature${reversed ? ' is-reversed' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* O palco recebe o mouse e não gira; só a capa inclina */}
      <div
        className="feature-media"
        onPointerMove={handlers.onPointerMove}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={() => {
          handlers.onPointerLeave();
          setHovered(false);
        }}
      >
        <m.button
          type="button"
          className="feature-cover"
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          onClick={onOpen}
          aria-label={`${t.projects.viewDetails}: ${project.name}`}
        >
          <ProjectCover project={project} playing={hovered} />
        </m.button>
      </div>

      <div className="feature-body">
        <ProjectBadges project={project} showFeatured />
        <h3 className="feature-title">{project.name}</h3>
        <p className="feature-description">{l(project.description)}</p>
        <ProjectOrigin project={project} />

        <ul className="highlights">
          {project.highlights.map((h) => (
            <li key={h.pt}>
              <Check size={16} aria-hidden="true" />
              {l(h)}
            </li>
          ))}
        </ul>

        <TagList tags={project.tags} />
        <RepoActivity repoUrl={project.repoUrl} />

        <div className="feature-actions">
          <button type="button" className="btn btn-primary" onClick={onOpen}>
            {t.projects.viewDetails}
          </button>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              {t.projects.viewLive}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
            aria-label={`${t.projects.code}: ${project.name} (GitHub)`}
          >
            <GitHubIcon size={20} />
          </a>
        </div>
      </div>
    </m.article>
  );
}
