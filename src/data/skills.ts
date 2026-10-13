import {
  siC, siCplusplus, siCss, siElectron, siExpress, siGit, siGithub, siHtml5, siJavascript,
  siNextdotjs, siNodedotjs, siPostgresql, siPrisma, siPython, siReact, siTailwindcss,
  siTypescript, siVitest,
  type SimpleIcon,
} from 'simple-icons';
import type { Localized } from '../i18n/I18nProvider';

export type SkillCategory = 'frontend' | 'backend' | 'desktop' | 'testing' | 'tools' | 'games' | 'languages';

export interface Skill {
  name: string;
  /** Rótulo pequeno no card (texto em skills.categories do dicionário) */
  category: SkillCategory;
  /** Logo do Simple Icons; sem logo, mostramos `monogram` */
  icon?: SimpleIcon;
  monogram?: string;
  /** Tag correspondente em projects.ts (padrão: o próprio nome) */
  tag?: string;
}

export const skillTiers: { id: 'daily' | 'familiar'; skills: Skill[] }[] = [
  {
    id: 'daily',
    skills: [
      { name: 'HTML', category: 'frontend', icon: siHtml5 },
      { name: 'CSS', category: 'frontend', icon: siCss },
      { name: 'JavaScript', category: 'frontend', icon: siJavascript },
      { name: 'TypeScript', category: 'frontend', icon: siTypescript },
      { name: 'React', category: 'frontend', icon: siReact },
      { name: 'Git', category: 'tools', icon: siGit },
      { name: 'GitHub', category: 'tools', icon: siGithub },
    ],
  },
  {
    id: 'familiar',
    skills: [
      { name: 'Tailwind CSS', category: 'frontend', icon: siTailwindcss },
      { name: 'Next.js', category: 'frontend', icon: siNextdotjs },
      { name: 'Node.js', category: 'backend', icon: siNodedotjs },
      { name: 'Express', category: 'backend', icon: siExpress },
      { name: 'SQL · PostgreSQL', category: 'backend', icon: siPostgresql, tag: 'PostgreSQL' },
      { name: 'Prisma', category: 'backend', icon: siPrisma },
      { name: 'Electron', category: 'desktop', icon: siElectron },
      { name: 'Vitest', category: 'testing', icon: siVitest },
      { name: 'Pygame', category: 'games', monogram: 'Pg' },
      { name: 'Python', category: 'languages', icon: siPython },
      { name: 'C', category: 'languages', icon: siC },
      { name: 'C#', category: 'languages', monogram: 'C#' },
      { name: 'C++', category: 'languages', icon: siCplusplus },
    ],
  },
];

export const practices: Localized[] = [
  { pt: 'Responsividade', en: 'Responsive design' },
  { pt: 'UI/UX', en: 'UI/UX' },
];
