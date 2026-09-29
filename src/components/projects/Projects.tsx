import { useCallback, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { projects } from '../../data/projects';
import { reveal } from '../../hooks/reveal';
import { ProjectCard } from './ProjectCard';
import { Lightbox, type LightboxImage } from './Lightbox';
import { projectCountByTag, useProjectFilter } from './ProjectFilter';

const tags = [...projectCountByTag.keys()];

export function Projects() {
  const { t, l } = useI18n();
  const { filter, setFilter } = useProjectFilter();
  const [gallery, setGallery] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  const visible = filter === null ? projects : projects.filter((p) => p.tags.includes(filter));

  const closeGallery = useCallback(() => setGallery(null), []);
  const changeGalleryImage = useCallback(
    (index: number) => setGallery((g) => (g ? { ...g, index } : g)),
    [],
  );

  return (
    <section id="projetos" className="section container">
      <h2 className="section-title reveal" ref={reveal}>{t.projects.title}</h2>

      <div className="filter-bar" role="group" aria-label={t.projects.filterLabel}>
        {[null, ...tags].map((tag) => (
          <button
            key={tag ?? 'all'}
            type="button"
            className={`filter-btn${filter === tag ? ' active' : ''}`}
            aria-pressed={filter === tag}
            onClick={() => setFilter(tag)}
          >
            {tag ?? t.projects.filterAll}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {visible.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenImage={(index) => setGallery({
              images: project.images.map((img) => ({ src: img.src, alt: `${project.name} — ${l(img.caption)}` })),
              index,
            })}
          />
        ))}
      </div>

      <Lightbox
        images={gallery?.images ?? []}
        index={gallery?.index ?? null}
        onChange={changeGalleryImage}
        onClose={closeGallery}
      />
    </section>
  );
}
