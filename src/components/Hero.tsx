import type { CSSProperties } from 'react';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { GitHubIcon, LinkedInIcon } from './Icons';

// Atraso da animação de entrada de cada bloco (ver .hero-in no CSS)
const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

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

          <h1 className="hero-title hero-in" style={stagger(1)}>
            {profile.name}
            <span className="hero-role">{t.hero.role}</span>
          </h1>

          <p className="hero-description hero-in" style={stagger(2)}>
            {t.hero.description}
          </p>

          <div className="hero-actions hero-in" style={stagger(3)}>
            <a href="#projetos" className="btn btn-primary">
              {t.hero.viewProjects}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={profile.cvUrl} className="btn btn-secondary" download>
              <Download size={18} aria-hidden="true" />
              {t.hero.downloadCv}
            </a>
          </div>

          <ul className="hero-social hero-in" style={stagger(4)} aria-label={t.hero.social}>
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

        <figure className="hero-portrait hero-in" style={stagger(2)}>
          <img
            src="/assets/images/foto_profissional.webp"
            alt={profile.name}
            width={720}
            height={720}
            fetchPriority="high"
          />
          <figcaption className="hero-location">
            <MapPin size={16} aria-hidden="true" />
            {t.hero.location}
          </figcaption>
        </figure>
      </div>
    </header>
  );
}
