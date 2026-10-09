import { useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useI18n, type Lang } from '../i18n/I18nProvider';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollFrame, useScrolledPast } from '../hooks/useScroll';
import { useTheme } from '../hooks/useTheme';

const SECTIONS = ['sobre', 'skills', 'projetos', 'curriculo', 'contato'] as const;
const LANGS: Lang[] = ['pt', 'en'];

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const scrolled = useScrolledPast(24);
  const active = useActiveSection(SECTIONS);
  const [menuOpen, setMenuOpen] = useState(false);

  // Atualiza a barra direto no DOM para não re-renderizar a navbar a cada frame
  const progressRef = useRef<HTMLDivElement>(null);
  useScrollFrame((_, progress) => {
    progressRef.current?.style.setProperty('transform', `scaleX(${progress})`);
  });

  const labels: Record<(typeof SECTIONS)[number], string> = {
    sobre: t.nav.about,
    skills: t.nav.skills,
    projetos: t.nav.projects,
    curriculo: t.nav.resume,
    contato: t.nav.contact,
  };

  return (
    <nav className={`navbar${scrolled || menuOpen ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#" className="logo">itsmariah<span aria-hidden="true">.</span></a>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'active' : undefined}
                aria-current={active === id ? 'true' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {labels[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button className="icon-btn" type="button" onClick={(e) => toggle(e.currentTarget)} aria-label={t.nav.themeToggle}>
            {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          </button>

          <div className="lang-toggle" role="group" aria-label={t.nav.language}>
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="icon-btn hamburger"
            type="button"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
    </nav>
  );
}
