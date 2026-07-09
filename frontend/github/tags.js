// Atualiza as tags de linguagem de cada project-card com base no repo linkado no botão GitHub

// Frameworks/libs que a API de linguagens do GitHub não detecta (não são "linguagens"),
// então entram aqui manualmente por repo.
const EXTRA_TAGS = {
  'agenda.ai': ['React'],
  'moneytrack': ['React'],
};

(async function updateProjectTags() {
  const cards = document.querySelectorAll('.project-card');

  await Promise.all(Array.from(cards).map(async (card) => {
    const link = card.querySelector('.project-link-btn.github');
    const tagsEl = card.querySelector('.project-tags');
    if (!link || !tagsEl) return;

    const match = link.href.match(/github\.com\/([^/]+)\/([^/]+?)\/?$/);
    if (!match) return;
    const [, owner, repo] = match;

    try {
      const langs = await ghFetch(`/repos/${owner}/${repo}/languages`);
      const top = topLanguages(langs, 4);
      if (!top.length) return;

      const extras = EXTRA_TAGS[repo] || [];
      const all = [...top, ...extras.filter(t => !top.includes(t))];

      tagsEl.innerHTML = '';
      all.forEach((lang) => {
        const span = document.createElement('span');
        span.textContent = lang;
        tagsEl.appendChild(span);
      });
    } catch {
      // API falhou (offline ou rate limit) — mantém as tags hardcoded do HTML
    }
  }));

  document.dispatchEvent(new CustomEvent('project-tags-ready'));
})();
