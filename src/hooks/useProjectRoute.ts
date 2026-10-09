import { useCallback, useEffect, useRef, useState } from 'react';

const PREFIX = 'projeto/';

/** id do projeto no hash da URL (#projeto/<id>), ou null. */
export function projectIdFromHash() {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  return hash.startsWith(PREFIX) ? hash.slice(PREFIX.length) : null;
}

/** Link compartilhável que abre o projeto direto no modal. */
export function projectUrl(id: string) {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}#${PREFIX}${id}`;
}

/**
 * Projeto aberto no modal, guardado no hash da URL: o link pode ser compartilhado
 * e o botão "voltar" do navegador fecha o modal.
 */
export function useProjectRoute(validIds: ReadonlySet<string>) {
  const read = useCallback(() => {
    const id = projectIdFromHash();
    return id && validIds.has(id) ? id : null;
  }, [validIds]);

  const [openId, setOpenId] = useState<string | null>(read);
  // true quando a entrada do histórico foi criada aqui: aí fechar = voltar no histórico
  const pushedRef = useRef(false);

  // Voltar/avançar no navegador ou editar o hash à mão
  useEffect(() => {
    const sync = () => {
      const id = read();
      if (!id) pushedRef.current = false;
      setOpenId(id);
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, [read]);

  const open = useCallback((id: string) => {
    history.pushState(null, '', `#${PREFIX}${id}`);
    pushedRef.current = true;
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    if (pushedRef.current) {
      // O popstate resultante limpa o openId
      pushedRef.current = false;
      history.back();
    } else {
      // Chegou por um link compartilhado: só tira o hash, sem sair do site
      history.replaceState(null, '', window.location.pathname + window.location.search);
      setOpenId(null);
    }
  }, []);

  return { openId, open, close };
}
