import { useEffect, useState } from 'react';

/** Retorna o id da seção que está na faixa central da tela. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) setActive(id);
        // Saindo da faixa sem outra seção entrando (ex.: voltou ao hero): nenhuma ativa
        else setActive((current) => (current === id ? null : current));
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
