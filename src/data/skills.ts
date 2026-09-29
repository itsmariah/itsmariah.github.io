import type { Localized } from '../i18n/I18nProvider';

export interface SkillGroup {
  id: string;
  title: Localized;
  items: (string | Localized)[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { pt: 'Front-end', en: 'Front-end' },
    items: ['HTML', 'CSS', 'JavaScript', 'React', { pt: 'Responsividade', en: 'Responsiveness' }, 'UI/UX'],
  },
  {
    id: 'backend',
    title: { pt: 'Back-end e dados', en: 'Back-end & data' },
    items: ['Node.js', 'SQL'],
  },
  {
    id: 'tools',
    title: { pt: 'Ferramentas', en: 'Tools' },
    items: ['Git', 'GitHub'],
  },
  {
    id: 'other',
    title: { pt: 'Outras linguagens', en: 'Other languages' },
    items: ['Python', 'Pygame', 'C', 'C#', 'C++'],
  },
];
