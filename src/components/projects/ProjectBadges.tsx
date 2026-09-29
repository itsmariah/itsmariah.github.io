import { useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';

export function ProjectBadges({ project, showFeatured = false }: { project: Project; showFeatured?: boolean }) {
  const { t } = useI18n();
  const published = project.status === 'published';

  return (
    <div className="project-badges">
      {showFeatured && project.featured && <span className="badge badge-accent">{t.status.featured}</span>}
      <span className={`badge badge-status ${published ? 'is-published' : 'is-progress'}`}>
        {published ? t.status.published : t.status.inProgress}
      </span>
      {project.team && <span className="badge">{t.projects.team}</span>}
    </div>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="tag-list">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}
