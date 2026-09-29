import { useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';

export function ProjectBadges({ project, showFeatured = false }: { project: Project; showFeatured?: boolean }) {
  const { t, l } = useI18n();
  const published = project.status === 'published';

  return (
    <div className="project-badges">
      {showFeatured && project.featured && <span className="badge badge-accent">{t.status.featured}</span>}
      <span className={`badge badge-status ${published ? 'is-published' : 'is-progress'}`}>
        {published ? t.status.published : t.status.inProgress}
      </span>
      {project.team && <span className="badge">{t.projects.team}</span>}
      {project.notes?.map((note) => <span className="badge badge-note" key={note.pt}>{l(note)}</span>)}
    </div>
  );
}

/** "Como começou": aparece no destaque e no modal quando o projeto tem `origin` */
export function ProjectOrigin({ project }: { project: Project }) {
  const { t, l } = useI18n();
  if (!project.origin) return null;
  return (
    <p className="project-origin">
      <strong>{t.projects.origin}</strong> {l(project.origin)}
    </p>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="tag-list">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}
