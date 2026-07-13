const I18N_STORAGE_KEY = 'portfolio-lang';
const I18N_DEFAULT = 'pt';

const I18N_META = {
  pt: { flag: '🇧🇷', code: 'PT', htmlLang: 'pt-BR' },
  en: { flag: '🇺🇸', code: 'EN', htmlLang: 'en' },
  es: { flag: '🇪🇸', code: 'ES', htmlLang: 'es' },
  fr: { flag: '🇫🇷', code: 'FR', htmlLang: 'fr' },
  de: { flag: '🇩🇪', code: 'DE', htmlLang: 'de' },
  ja: { flag: '🇯🇵', code: 'JA', htmlLang: 'ja' },
};

let currentLang = I18N_DEFAULT;
try {
  const stored = localStorage.getItem(I18N_STORAGE_KEY);
  if (stored && window.I18N[stored]) currentLang = stored;
} catch {}

function t(key, vars) {
  const lookup = (lang) => key.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), window.I18N[lang]);
  let value = lookup(currentLang);
  if (value === undefined) value = lookup(I18N_DEFAULT);
  if (value === undefined) return key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => { value = value.replace(`{${k}}`, v); });
  }
  return value;
}

function updateSwitcherUI() {
  const meta = I18N_META[currentLang];
  const flagEl = document.getElementById('langFlag');
  const codeEl = document.getElementById('langCode');
  if (flagEl) flagEl.textContent = meta.flag;
  if (codeEl) codeEl.textContent = meta.code;
  document.querySelectorAll('#langMenu [role="option"]').forEach((li) => {
    li.setAttribute('aria-selected', String(li.dataset.lang === currentLang));
  });
}

function applyTranslations() {
  document.documentElement.lang = I18N_META[currentLang].htmlLang;

  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)); });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => { el.setAttribute('title', t(el.dataset.i18nTitle)); });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });

  updateSwitcherUI();
}

function setLanguage(lang) {
  if (!window.I18N[lang]) return;
  currentLang = lang;
  try { localStorage.setItem(I18N_STORAGE_KEY, lang); } catch {}
  applyTranslations();
  if (window.rebuildDynamicContent) window.rebuildDynamicContent();
  closeLangMenu();
}

function closeLangMenu() {
  const menu = document.getElementById('langMenu');
  const btn = document.getElementById('langSwitcherBtn');
  if (!menu || !btn) return;
  menu.hidden = true;
  btn.setAttribute('aria-expanded', 'false');
}

window.t = t;
window.setLanguage = setLanguage;
window.applyTranslations = applyTranslations;
window.getCurrentLang = () => currentLang;

applyTranslations();

const langBtn = document.getElementById('langSwitcherBtn');
const langMenu = document.getElementById('langMenu');
if (langBtn && langMenu) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !langMenu.hidden;
    langMenu.hidden = isOpen;
    langBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  langMenu.querySelectorAll('[role="option"]').forEach((li) => {
    li.addEventListener('click', () => setLanguage(li.dataset.lang));
  });

  document.addEventListener('click', (e) => {
    if (!langMenu.hidden && !e.target.closest('.lang-switcher')) closeLangMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLangMenu();
  });
}
