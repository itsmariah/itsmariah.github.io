import {
  siC, siCplusplus, siCss, siElectron, siExpress, siGit, siGithub, siHtml5, siJavascript,
  siNextdotjs, siNodedotjs, siPostgresql, siPrisma, siPython, siReact, siTailwindcss,
  siTypescript, siVitest,
  type SimpleIcon,
} from 'simple-icons';
import type { Localized } from '../i18n/I18nProvider';

export interface Skill {
  name: string;
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
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'React', icon: siReact },
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
    ],
  },
  {
    id: 'familiar',
    skills: [
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'Express', icon: siExpress },
      { name: 'SQL · PostgreSQL', icon: siPostgresql, tag: 'PostgreSQL' },
      { name: 'Prisma', icon: siPrisma },
      { name: 'Electron', icon: siElectron },
      { name: 'Vitest', icon: siVitest },
      { name: 'Python', icon: siPython },
      { name: 'Pygame', monogram: 'Pg' },
      { name: 'C', icon: siC },
      { name: 'C#', monogram: 'C#' },
      { name: 'C++', icon: siCplusplus },
    ],
  },
];

export const practices: Localized[] = [
  { pt: 'Responsividade', en: 'Responsive design' },
  { pt: 'UI/UX', en: 'UI/UX' },
];
