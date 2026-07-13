(async function populateSkills() {
  const grid = document.querySelector('.skills-grid');
  if (!grid) return;

  // Sempre aparecem independente do que o GitHub detectar
  // (C, C#, C++ e SQL foram aprendidas na faculdade, mas ainda sem repositórios publicados)
  const ALWAYS = ['Git', 'GitHub', 'UI/UX', 'Responsividade', 'C', 'C#', 'C++', 'SQL'];

  try {
    const repos = await ghFetch(`/users/${GITHUB_USER}/repos?per_page=100`);

    const langTotals = {};
    await Promise.all(
      repos
        .filter(r => !r.fork && !r.archived)
        .map(async r => {
          const langs = await ghFetch(`/repos/${GITHUB_USER}/${r.name}/languages`);
          for (const [lang, bytes] of Object.entries(langs)) {
            langTotals[lang] = (langTotals[lang] || 0) + bytes;
          }
        })
    );

    const fromGH = topLanguages(langTotals);
    if (!fromGH.length) return;

    const all = [...fromGH, ...ALWAYS.filter(t => !fromGH.includes(t))];

    grid.innerHTML = '';

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });

    all.forEach(name => {
      const el = document.createElement('div');
      el.className = 'skill-card reveal';
      el.textContent = name;
      grid.appendChild(el);
      obs.observe(el);
    });
  } catch {
    // API falhou (offline ou rate limit) — mantém os cards hardcoded do HTML
  }
})();
