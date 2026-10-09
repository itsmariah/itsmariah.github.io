/**
 * Baixa um módulo carregado sob demanda quando o navegador fica ocioso, para que a primeira
 * abertura seja instantânea sem pesar no carregamento inicial. Retorna a limpeza (para useEffect).
 */
export function prefetchWhenIdle(load: () => Promise<unknown>) {
  const run = () => { load().catch(() => { /* sem rede: tenta de novo quando for aberto */ }); };

  // O Safari ainda não tem requestIdleCallback
  if ('requestIdleCallback' in window) {
    const id = requestIdleCallback(run, { timeout: 4000 });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(run, 2500);
  return () => clearTimeout(id);
}
