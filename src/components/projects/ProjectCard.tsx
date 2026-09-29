import { useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';
import { reveal } from '../../hooks/reveal';
import { GitHubIcon } from '../Icons';
import { Slideshow } from './Slideshow';

interface ProjectCardProps {
  project: Project;
  onOpenImage: (index: number) => void;
}

export function ProjectCard({ project, onOpenImage }: ProjectCardProps) {
  const { t, l } = useI18n();
  const published = project.status === 'published';

  return (
    <article className={`project-card reveal${project.featured ? ' destaque' : ''}`} ref={reveal}>
      <Slideshow project={project} onOpen={onOpenImage} />

      <div className="project-body">
        <div className="project-header">
          {project.featured && <span className="project-badge">{t.status.featured}</span>}
          <span className={`status-badge ${published ? 'published' : 'in-progress'}`}>
            {published ? t.status.published : t.status.inProgress}
          </span>
        </div>
        <h3>{project.name}</h3>
        <p>{l(project.description)}</p>
        <div className="project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn demo">
              {t.projects.viewLive}
            </a>
          )}
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn github">
            <GitHubIcon size={15} />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
