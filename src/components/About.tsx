import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { reveal } from '../hooks/reveal';

export function About() {
  const { t } = useI18n();

  return (
    <section id="sobre" className="section container">
      <h2 className="section-title reveal" ref={reveal}>{t.about.title}</h2>
      <div className="sobre-content">
        <div className="sobre-text">
          <p className="section-text reveal" ref={reveal}>{t.about.p1}</p>
          <p className="section-text reveal" ref={reveal}>{t.about.p2}</p>
        </div>
        <div className="sobre-media reveal" ref={reveal}>
          <div className="sobre-photo-ring">
            <img
              src="/assets/images/foto_mariah.jpg"
              alt={profile.name}
              className="sobre-photo"
              width={440}
              height={439}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
