// ── Tema claro/escuro ──
// A atribuição inicial de data-theme já acontece no <head> (evita flash).
// Este script só cuida da persistência e do clique no botão.
const THEME_STORAGE_KEY = 'portfolio-theme';

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch {}
}

const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    setTheme(getTheme() === 'light' ? 'dark' : 'light');
  });
}

window.getTheme = getTheme;
