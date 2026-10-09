import type { CSSProperties } from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { HeroPortrait } from './hero/HeroPortrait';
import { MagneticLink } from './hero/MagneticLink';
import { RotatingRole } from './hero/RotatingRole';

// Atraso da animação de entrada de cada bloco (ver .hero-in no CSS)
const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

/** Nome dividido em letras que sobem uma a uma (ver .hero-letter no CSS). */
function SplitName({ name }: { name: string }) {
  let letterIndex = 0;
  return (
    <span className="hero-name" aria-hidden="true">
      {name.split(' ').map((word, w) => (
        <span key={w}>
          {w > 0 && ' '}
          <span className="hero-name-word">
            {[...word].map((char, c) => (
              <span className="hero-letter" key={c} style={{ '--ci': letterIndex++ } as CSSProperties}>
                {char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { t } = useI18n();

  return (
    <header className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="status-pill hero-in" style={stagger(0)}>
            <span className="status-dot" aria-hidden="true"></span>
            {t.hero.tag}
          </p>

          <h1 className="hero-title">
            {/* Versão para leitores de tela; a parte visual é animada e fica oculta para eles */}
            <span className="visually-hidden">{profile.name} — {t.hero.role}</span>
            <SplitName name={profile.name} />
            <span className="hero-role hero-in" style={stagger(3)}>
              <RotatingRole roles={t.hero.roles} />
            </span>
          </h1>

          <p className="hero-description hero-in" style={stagger(4)}>
            {t.hero.description}
          </p>

          <div className="hero-actions hero-in" style={stagger(5)}>
            <MagneticLink href="#projetos" className="btn btn-primary btn-shine">
              {t.hero.viewProjects}
              <ArrowRight size={18} aria-hidden="true" />
            </MagneticLink>
            <a href={profile.cvUrl} className="btn btn-secondary" download>
              <Download size={18} aria-hidden="true" />
              {t.hero.downloadCv}
            </a>
          </div>

          <ul className="hero-social hero-in" style={stagger(6)} aria-label={t.hero.social}>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub">
                <GitHubIcon size={20} />
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn">
                <LinkedInIcon size={20} />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="icon-link" aria-label={`E-mail: ${profile.email}`}>
                <Mail size={20} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <HeroPortrait alt={profile.name} location={t.hero.location} style={stagger(2)} />
      </div>

      <a href="#sobre" className="scroll-hint hero-in" style={stagger(8)} aria-label={t.hero.scrollHint}>
        <span className="scroll-mouse" aria-hidden="true"><span className="scroll-wheel" /></span>
      </a>
    </header>
  );
}
