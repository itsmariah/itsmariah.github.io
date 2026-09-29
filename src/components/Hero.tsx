import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { DownloadIcon } from './Icons';

export function Hero() {
  const { t } = useI18n();

  return (
    <header className="hero">
      <div className="hero-content container">
        <div className="hero-text">
          <p className="tag available">{t.hero.tag}</p>
          <h1 className="hero-title">
            {profile.name}
            <span className="hero-role">{t.hero.role}</span>
          </h1>
          <p className="hero-slogan">{t.hero.title}</p>
          <p className="description">{t.hero.description}</p>
          <div className="hero-buttons">
            <a href="#projetos" className="btn primary">{t.hero.viewProjects}</a>
            <a href={profile.cvUrl} className="btn secondary btn-icon" download>
              <DownloadIcon />
              <span>{t.hero.downloadCv}</span>
            </a>
            <a href="#contato" className="btn secondary">{t.hero.contactMe}</a>
          </div>
        </div>

        <div className="hero-photo">
          <div className="photo-ring">
            <img
              src="/assets/images/foto_profissional.jpg"
              alt={profile.name}
              className="profile-photo"
              width={729}
              height={729}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
