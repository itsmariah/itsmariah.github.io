import { useState, type Ref } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';
import { GitHubIcon } from '../Icons';
import { ProjectBadges, TagList } from './ProjectBadges';
import { ProjectCover } from './ProjectCover';

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
  /** O AnimatePresence com mode="popLayout" precisa de ref no filho direto */
  ref?: Ref<HTMLLIElement>;
}

export function ProjectCard({ project, onOpen, ref }: ProjectCardProps) {
  const { t, l } = useI18n();
  // Mouse sobre o card: a capa passa pelas imagens da galeria
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      ref={ref}
      layout
      className="project-card spotlight"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectCover project={project} playing={hovered} />

      <div className="project-card-body">
        <ProjectBadges project={project} />
        <h3 className="project-card-title">
          {/* O ::after deste botão cobre o card inteiro: clicar em qualquer lugar abre os detalhes */}
          <button type="button" className="card-open" onClick={onOpen}>
            {project.name}
            <span className="visually-hidden"> — {t.projects.viewDetails}</span>
          </button>
        </h3>
        <p className="project-card-description">{l(project.description)}</p>
        <TagList tags={project.tags} />

        <div className="project-card-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
              {t.projects.viewLive}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-link">
            <GitHubIcon size={15} />
            {t.projects.code}
          </a>
        </div>
      </div>
    </motion.li>
  );
}
