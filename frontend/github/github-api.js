const GITHUB_USER = 'itsmariah';

// Linguagens de infraestrutura/build que não representam uma skill/tecnologia real
const LANG_SKIP = new Set(['Makefile', 'Dockerfile', 'Shell', 'Batchfile', 'PowerShell', 'SCSS', 'EJS']);

// Recebe { linguagem: bytes }, devolve nomes ordenados por peso, filtrando ruído (<1% do total)
function topLanguages(langTotals, limit = Infinity) {
  const total = Object.values(langTotals).reduce((s, v) => s + v, 0);
  if (!total) return [];
  return Object.entries(langTotals)
    .filter(([lang, bytes]) => !LANG_SKIP.has(lang) && bytes / total >= 0.01)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang)
    .slice(0, limit);
}

async function ghFetch(path) {
  const key = 'gh_cache_' + path;
  const raw = sessionStorage.getItem(key);
  if (raw) {
    try {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < 30 * 60 * 1000) return data;
    } catch {}
  }
  const res = await fetch('https://api.github.com' + path);
  if (!res.ok) throw new Error('GitHub API ' + res.status);
  const data = await res.json();
  try { sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data })); } catch {}
  return data;
}
