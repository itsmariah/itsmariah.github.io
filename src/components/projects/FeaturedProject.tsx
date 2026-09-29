import { ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';
import { GitHubIcon } from '../Icons';
import { ProjectBadges, ProjectOrigin, TagList } from './ProjectBadges';
import { ProjectCover } from './ProjectCover';

interface FeaturedProjectProps {
  project: Project;
  reversed: boolean;
  onOpen: () => void;
}

export function FeaturedProject({ project, reversed, onOpen }: FeaturedProjectProps) {
  const { t, l } = useI18n();

  return (
    <motion.article
      className={`feature${reversed ? ' is-reversed' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <button type="button" className="feature-cover" onClick={onOpen} aria-label={`${t.projects.viewDetails}: ${project.name}`}>
        <ProjectCover project={project} />
      </button>

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
    </motion.article>
  );
}
