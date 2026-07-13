// ── Sort projects: published first, in-progress last ──
(function sortProjects() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.project-card'));
  const destaque = cards.find((c) => c.classList.contains('destaque'));
  const rest = cards.filter((c) => !c.classList.contains('destaque'));

  const published   = rest.filter((c) => c.querySelector('.status-badge.published'));
  const inProgress  = rest.filter((c) => !c.querySelector('.status-badge.published'));

  const ordered = [destaque, ...published, ...inProgress].filter(Boolean);
  ordered.forEach((c) => grid.appendChild(c));
})();

const navbar        = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop     = document.getElementById('backToTop');
const hamburger     = document.getElementById('hamburger');
const navLinks      = document.getElementById('navLinks');

// ── Scroll handler ──
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const total   = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = ((scrollY / total) * 100) + '%';
  navbar.classList.toggle('scrolled', scrollY > 60);
  backToTop.classList.toggle('visible', scrollY > 400);
});

// ── Back to top ──
backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Hamburger ──
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((a) => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach((s) => sectionObserver.observe(s));

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ── Typewriter ──
const typeTarget = document.querySelector('.typewriter-target');
const fullText   = typeTarget.textContent.trim();
typeTarget.textContent = '';

const cursor = document.createElement('span');
cursor.className = 'cursor';
typeTarget.appendChild(cursor);

let i = 0;
function type() {
  if (i < fullText.length) {
    typeTarget.insertBefore(document.createTextNode(fullText[i]), cursor);
    i++;
    setTimeout(type, i < 10 ? 120 : 38);
  } else {
    setTimeout(() => { cursor.style.display = 'none'; }, 1800);
  }
}
setTimeout(type, 500);

// ── Copy email ──
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('mariamariahqfs@gmail.com').then(() => {
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;
      }, 2200);
    });
  });
}

// ══════════════════════════════════════
// Starfield canvas
// ══════════════════════════════════════
(function initStars() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  const STAR_COUNT = 160;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 1.4 + 0.3,
      alpha:   Math.random(),
      dAlpha:  (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
    };
  }

  function initStarList() {
    stars = Array.from({ length: STAR_COUNT }, createStar);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      s.alpha += s.dAlpha;
      if (s.alpha <= 0 || s.alpha >= 1) s.dAlpha *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${Math.abs(s.alpha)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initStarList();
  draw();
  window.addEventListener('resize', () => { resize(); initStarList(); });
})();

// ══════════════════════════════════════
// Project slideshow
// ══════════════════════════════════════
document.querySelectorAll('.project-slideshow').forEach((ss) => {
  const track  = ss.querySelector('.slides-track');
  const slides = track.querySelectorAll('.slide');
  const dotsWrap = ss.querySelector('.slide-dots');
  const prevBtn  = ss.querySelector('.slide-btn.prev');
  const nextBtn  = ss.querySelector('.slide-btn.next');
  const useFade  = ss.classList.contains('has-images');

  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    // single dot still shown for aesthetics
    const dot = document.createElement('span');
    dot.className = 'dot active';
    dotsWrap.appendChild(dot);
    return;
  }

  let current = 0;
  let autoTimer = null;

  // Build dots
  slides.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (idx === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(idx));
    dotsWrap.appendChild(dot);
  });

  function goTo(idx) {
    if (useFade) slides[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    if (useFade) {
      slides[current].classList.add('active');
    } else {
      track.style.transform = `translateX(-${current * 100}%)`;
    }
    dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 3500);
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });

  // Auto-play on hover
  ss.addEventListener('mouseenter', resetAuto);
  ss.addEventListener('mouseleave', () => clearInterval(autoTimer));

  // Touch swipe
  let touchStartX = 0;
  ss.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  ss.addEventListener('touchend',   (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
});

// ══════════════════════════════════════
// Language chart (reads project tags from DOM)
// ══════════════════════════════════════
function buildLangChart() {
  const chart = document.getElementById('langChart');
  if (!chart) return;
  chart.innerHTML = '';

  const counts = {};
  document.querySelectorAll('.project-tags span').forEach((tag) => {
    const name = tag.textContent.trim();
    counts[name] = (counts[name] || 0) + 1;
  });

  const total = Math.max(...Object.values(counts));

  const colors = [
    'linear-gradient(90deg,#e34c26,#f06529)',   // HTML
    'linear-gradient(90deg,#264de4,#2965f1)',   // CSS
    'linear-gradient(90deg,#f0db4f,#e8c50a)',   // JavaScript
    'linear-gradient(90deg,#68a063,#3d7a38)',   // Node.js
    'linear-gradient(90deg,#7c8cff,#a78bfa)',   // default
    'linear-gradient(90deg,#06b6d4,#0e7490)',   // UI/UX
    'linear-gradient(90deg,#f472b6,#be185d)',   // Responsividade
    'linear-gradient(90deg,#61dafb,#21a1c4)',   // React
    'linear-gradient(90deg,#3178c6,#235a97)',   // TypeScript
    'linear-gradient(90deg,#4caf50,#2e7d32)',   // Python
    'linear-gradient(90deg,#0fa968,#0b7a4b)',   // Pygame
  ];

  const colorMap = {
    'HTML':           colors[0],
    'CSS':            colors[1],
    'JavaScript':     colors[2],
    'Node.js':        colors[3],
    'Git':            colors[4],
    'Hub':         colors[4],
    'UI/UX':          colors[5],
    'Responsividade': colors[6],
    'React':          colors[7],
    'TypeScript':     colors[8],
    'Python':         colors[9],
    'Pygame':         colors[10],
  };

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([lang, count]) => {
    const pct = Math.round((count / total) * 100);
    const row = document.createElement('div');
    row.className = 'lang-bar-row';
    row.innerHTML = `
      <span class="lang-bar-label">${lang}</span>
      <div class="lang-bar-track">
        <div class="lang-bar-fill" style="background:${colorMap[lang] || colors[4]}"></div>
      </div>
      <span class="lang-bar-pct">${t('projects.langChartCount', { count })}</span>
    `;
    chart.appendChild(row);
  });

  // Animate bars when chart comes into view
  const chartObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sorted.forEach(([lang, count], idx) => {
        const pct = Math.round((count / total) * 100);
        const fill = chart.querySelectorAll('.lang-bar-fill')[idx];
        if (fill) setTimeout(() => { fill.style.width = pct + '%'; }, idx * 80);
      });
      chartObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  chartObs.observe(chart);
}

// ══════════════════════════════════════
// Resume tabs
// ══════════════════════════════════════
document.querySelectorAll('.resume-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.resume-tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.resume-panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) {
      panel.classList.add('active');
      // Re-animate hard skill bars when switching to that tab
      if (tab.dataset.tab === 'hard') {
        panel.querySelectorAll('.hs-fill').forEach((fill, idx) => {
          fill.style.width = '0%';
          const pct = fill.style.getPropertyValue('--pct');
          setTimeout(() => { fill.style.width = pct; }, idx * 120 + 50);
        });
      }
    }
  });
});

// Animate hard skill bars on first reveal
const hardPanel = document.getElementById('tab-hard');
if (hardPanel) {
  const hsObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.hs-fill').forEach((fill, idx) => {
        const pct = fill.style.getPropertyValue('--pct') ||
          (fill.getAttribute('style') || '').match(/--pct:\s*([\d%]+)/)?.[1] || '0%';
        setTimeout(() => { fill.style.width = pct; }, idx * 120 + 50);
      });
      hsObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  hsObs.observe(hardPanel);
}

// ══════════════════════════════════════
// Contact form
// ══════════════════════════════════════
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn    = document.getElementById('formSubmit');
  const submitText   = submitBtn.querySelector('.submit-text');
  const submitLoad   = submitBtn.querySelector('.submit-loading');
  const feedback     = document.getElementById('formFeedback');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitText.hidden = true;
    submitLoad.hidden = false;
    submitBtn.disabled = true;
    feedback.hidden = true;
    feedback.className = 'form-feedback';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        feedback.textContent = t('contact.success');
        feedback.classList.add('success');
        contactForm.reset();
      } else {
        throw new Error('server');
      }
    } catch {
      feedback.textContent = t('contact.error');
      feedback.classList.add('error');
    } finally {
      feedback.hidden = false;
      submitText.hidden = false;
      submitLoad.hidden = true;
      submitBtn.disabled = false;
    }
  });
}

// ── Lightbox ──
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let lbImages = [];
let lbIndex  = 0;

function showLightboxImage() {
  const { src, alt } = lbImages[lbIndex];
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  const multi = lbImages.length > 1;
  lightboxPrev.classList.toggle('hidden', !multi);
  lightboxNext.classList.toggle('hidden', !multi);
}

function openLightbox(images, index) {
  lbImages = images;
  lbIndex  = index;
  showLightboxImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function lbNavigate(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  showLightboxImage();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.slide img').forEach((img) => {
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    const track  = img.closest('.slides-track');
    const imgs   = Array.from(track.querySelectorAll('.slide img'));
    const images = imgs.map((i) => ({ src: i.src, alt: i.alt }));
    openLightbox(images, imgs.indexOf(img));
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); lbNavigate(-1); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); lbNavigate(1); });

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lbNavigate(-1);
  if (e.key === 'ArrowRight') lbNavigate(1);
});

// ══════════════════════════════════════
// Project filters
// ══════════════════════════════════════
function buildProjectFilters() {
  const grid = document.querySelector('.projects-grid');
  const bar  = document.getElementById('filterBar');
  if (!grid || !bar) return;
  bar.innerHTML = '';

  const cards = Array.from(grid.querySelectorAll('.project-card'));

  const tagSet = new Set();
  cards.forEach(card => {
    card.querySelectorAll('.project-tags span').forEach(s => tagSet.add(s.textContent.trim()));
  });

  if (tagSet.size === 0) return;

  const ALL_FILTER = '__all__';

  function setFilter(tag) {
    btns.forEach(b => b.classList.toggle('active', b.dataset.tag === tag));

    cards.forEach(card => {
      const cardTags = Array.from(card.querySelectorAll('.project-tags span')).map(s => s.textContent.trim());
      const show     = tag === ALL_FILTER || cardTags.includes(tag);
      const wasHidden = card.classList.contains('proj-out');

      card.classList.remove('proj-out', 'proj-in');

      if (show) {
        if (wasHidden) {
          void card.offsetWidth;
          card.classList.add('proj-in');
          card.addEventListener('animationend', () => card.classList.remove('proj-in'), { once: true });
        }
      } else {
        card.classList.add('proj-out');
      }
    });
  }

  const allTags = [ALL_FILTER, ...tagSet];
  const btns = allTags.map(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (tag === ALL_FILTER ? ' active' : '');
    btn.dataset.tag = tag;
    btn.textContent = tag === ALL_FILTER ? t('projects.filterAll') : tag;
    btn.addEventListener('click', () => setFilter(tag));
    bar.appendChild(btn);
    return btn;
  });
}

// Roda depois que as tags de linguagem forem atualizadas via API do GitHub
// (com fallback caso o script de tags não carregue/dispare o evento)
let projectTagsInitDone = false;
function initProjectTagViews() {
  if (projectTagsInitDone) return;
  projectTagsInitDone = true;
  buildLangChart();
  buildProjectFilters();
}
document.addEventListener('project-tags-ready', initProjectTagViews, { once: true });
setTimeout(initProjectTagViews, 4000);

// Reconstrói o gráfico de linguagens e os filtros ao trocar de idioma
// (os textos "Todos" e "N proj." só existem dentro do HTML gerado por essas funções)
window.rebuildDynamicContent = () => {
  buildLangChart();
  buildProjectFilters();
};
