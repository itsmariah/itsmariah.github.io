import { useCallback, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, LayoutGroup } from 'motion/react';
import { format, useI18n } from '../../i18n/I18nProvider';
import { projects } from '../../data/projects';
import { reveal } from '../../hooks/reveal';
import { FeaturedProject } from './FeaturedProject';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { projectCountByTag, useProjectFilter } from './ProjectFilter';

const tags = [...projectCountByTag.keys()];
const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

export function Projects() {
  const { t } = useI18n();
  const { filter, setFilter } = useProjectFilter();
  const [openId, setOpenId] = useState<string | null>(null);

  const openProject = projects.find((p) => p.id === openId) ?? null;
  const closeModal = useCallback(() => setOpenId(null), []);

  // Com filtro ativo, todos os projetos que batem viram cards numa grade só
  const grid = filter === null ? others : projects.filter((p) => p.tags.includes(filter));
  const count = grid.length;

  return (
    <section id="projetos" className="section container">
      <div className="section-head reveal" ref={reveal}>
        <h2 className="section-title">
          <span className="section-num" aria-hidden="true">03</span>
          {t.projects.title}
        </h2>
        <p className="section-intro">{t.projects.intro}</p>
      </div>

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

      <LayoutGroup>
        {filter === null && (
          <div className="features">
            {featured.map((project, i) => (
              <FeaturedProject
                key={project.id}
                project={project}
                reversed={i % 2 === 1}
                onOpen={() => setOpenId(project.id)}
              />
            ))}
          </div>
        )}

        <div className="grid-head">
          {filter === null ? (
            <h3 className="grid-title">{t.projects.others}</h3>
          ) : (
            <>
              <p className="grid-title" role="status">
                {format(count === 1 ? t.projects.showingOne : t.projects.showing, { count, tag: filter })}
              </p>
              <button type="button" className="clear-filter" onClick={() => setFilter(null)}>
                <X size={15} aria-hidden="true" />
                {t.projects.clearFilter}
              </button>
            </>
          )}
        </div>

        <ul className="projects-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {grid.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => setOpenId(project.id)} />
            ))}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {openProject && <ProjectModal key={openProject.id} project={openProject} onClose={closeModal} />}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}
