import { ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { certificates } from '../data/certificates';
import { reveal } from '../hooks/reveal';

export function Certificates() {
  const { t, l } = useI18n();

  return (
    <section id="certificados" className="section container">
      <div className="section-head reveal" ref={reveal}>
        <h2 className="section-title">{t.certs.title}</h2>
        <p className="section-intro">{t.certs.intro}</p>
      </div>

      <div className="certs-grid">
        {certificates.map(({ id, icon: Icon, platform, name, date, file }) => (
          <div className="cert-card reveal" ref={reveal} key={id}>
            <div className="cert-icon" aria-hidden="true"><Icon size={20} /></div>
            <div className="cert-body">
              <span className="cert-platform">{platform}</span>
              <h3 className="cert-name">{l(name)}</h3>
              <span className="cert-date">{l(date)}</span>
            </div>
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn cert-link"
              title={t.certs.viewCert}
              aria-label={`${t.certs.viewCert}: ${l(name)}`}
            >
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
