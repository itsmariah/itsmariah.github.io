import { useRef, useState } from 'react';
import { useI18n, type Lang } from '../i18n/I18nProvider';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolledPast, useScrollFrame } from '../hooks/useScroll';
import { useTheme } from '../hooks/useTheme';
import { MoonIcon, SunIcon } from './Icons';

const SECTIONS = ['sobre', 'skills', 'projetos', 'certificados', 'curriculo', 'contato'] as const;
const LANGS: Lang[] = ['pt', 'en'];

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const scrolled = useScrolledPast(60);
  const active = useActiveSection(SECTIONS);
  const [menuOpen, setMenuOpen] = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);
  useScrollFrame((_, progress) => {
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
  });

  const labels: Record<(typeof SECTIONS)[number], string> = {
    sobre: t.nav.about,
    skills: t.nav.skills,
    projetos: t.nav.projects,
    certificados: t.nav.certificates,
    curriculo: t.nav.resume,
    contato: t.nav.contact,
  };

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#" className="logo" data-text="itsmariah">itsmariah</a>

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
            <button className="theme-toggle" type="button" onClick={toggle} aria-label={t.nav.themeToggle}>
              {theme === 'light' ? <MoonIcon size={17} /> : <SunIcon size={17} />}
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
              className={`hamburger${menuOpen ? ' open' : ''}`}
              type="button"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="navLinks"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
