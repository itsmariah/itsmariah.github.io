import type { Dictionary } from '../i18n/pt';

/** Seções navegáveis, na ordem da página (ids das âncoras). */
export const SECTIONS = ['sobre', 'skills', 'projetos', 'curriculo', 'contato'] as const;
export type SectionId = (typeof SECTIONS)[number];

export function sectionLabel(t: Dictionary, id: SectionId) {
  const labels: Record<SectionId, string> = {
    sobre: t.nav.about,
    skills: t.nav.skills,
    projetos: t.nav.projects,
    curriculo: t.nav.resume,
    contato: t.nav.contact,
  };
  return labels[id];
}
