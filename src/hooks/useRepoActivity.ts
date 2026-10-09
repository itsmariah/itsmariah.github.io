import { useEffect, useState } from 'react';

// Data do último push de cada repositório, lida da API pública do GitHub (sem token: 60 req/h por IP).
// Fica em cache no localStorage por algumas horas, e pedidos simultâneos ao mesmo repo são unificados.
const CACHE_KEY = 'portfolio-gh-activity';
const TTL_MS = 6 * 60 * 60 * 1000;

type Cache = Record<string, { pushedAt: string; fetchedAt: number }>;
const inflight = new Map<string, Promise<string | null>>();

/** "dono/repo" a partir da URL do GitHub, ou null se não for um repositório do GitHub. */
function repoPath(url: string) {
  return url.match(/github\.com\/([^/]+\/[^/#?]+)/)?.[1] ?? null;
}

function readCache(): Cache {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? '{}') as Cache;
  } catch {
    return {};
  }
}

function writeCache(path: string, pushedAt: string) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...readCache(), [path]: { pushedAt, fetchedAt: Date.now() } }));
  } catch { /* storage bloqueado: só não guarda */ }
}

function fetchPushedAt(path: string): Promise<string | null> {
  const cached = readCache()[path];
  if (cached && Date.now() - cached.fetchedAt < TTL_MS) return Promise.resolve(cached.pushedAt);

  let request = inflight.get(path);
  if (!request) {
    request = fetch(`https://api.github.com/repos/${path}`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { pushed_at?: unknown } | null) => {
        const pushedAt = typeof data?.pushed_at === 'string' ? data.pushed_at : null;
        if (pushedAt) writeCache(path, pushedAt);
        return pushedAt;
      })
      .catch(() => null)
      .finally(() => inflight.delete(path));
    inflight.set(path, request);
  }
  return request;
}

/** Data ISO do último push do repositório (null enquanto carrega ou se falhar). Só busca com `enabled`. */
export function useRepoActivity(repoUrl: string, enabled: boolean) {
  const [pushedAt, setPushedAt] = useState<string | null>(null);

  useEffect(() => {
    const path = repoPath(repoUrl);
    if (!enabled || !path) return;
    let active = true;
    fetchPushedAt(path).then((value) => { if (active) setPushedAt(value); });
    return () => { active = false; };
  }, [repoUrl, enabled]);

  return pushedAt;
}
