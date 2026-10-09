import { Lightbulb, Target, Trophy, type LucideIcon } from 'lucide-react';
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

/** "Do problema ao resultado": três passos com a história do projeto, no modal */
export function ProjectStory({ project }: { project: Project }) {
  const { t, l } = useI18n();
  if (!project.story) return null;
  const s = t.projects.story;
  const steps: { icon: LucideIcon; label: string; text: string }[] = [
    { icon: Target, label: s.problem, text: l(project.story.problem) },
    { icon: Lightbulb, label: s.solution, text: l(project.story.solution) },
    { icon: Trophy, label: s.result, text: l(project.story.result) },
  ];

  return (
    <ol className="project-story">
      {steps.map(({ icon: Icon, label, text }) => (
        <li className="story-step" key={label}>
          <span className="story-icon" aria-hidden="true"><Icon size={16} /></span>
          <div>
            <span className="story-label">{label}</span>
            <p className="story-text">{text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="tag-list">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}
