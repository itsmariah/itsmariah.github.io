import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { projects } from '../../data/projects';

interface ProjectFilterValue {
  /** Tag selecionada; null mostra todos os projetos */
  filter: string | null;
  setFilter: (tag: string | null) => void;
  /** Filtra pela tag e rola até a seção de projetos */
  showProjectsWith: (tag: string) => void;
}

const ProjectFilterContext = createContext<ProjectFilterValue | null>(null);

export function ProjectFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<string | null>(null);

  const value = useMemo<ProjectFilterValue>(() => ({
    filter,
    setFilter,
    showProjectsWith: (tag) => {
      setFilter(tag);
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
    },
  }), [filter]);

  return <ProjectFilterContext.Provider value={value}>{children}</ProjectFilterContext.Provider>;
}

export function useProjectFilter() {
  const ctx = useContext(ProjectFilterContext);
  if (!ctx) throw new Error('useProjectFilter precisa estar dentro de <ProjectFilterProvider>');
  return ctx;
}

/** Quantos projetos usam cada tag */
export const projectCountByTag: ReadonlyMap<string, number> = projects
  .flatMap((p) => p.tags)
  .reduce((counts, tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1), new Map<string, number>());
