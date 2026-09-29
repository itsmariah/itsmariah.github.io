import { useI18n } from '../i18n/I18nProvider';
import { certificates } from '../data/certificates';
import { reveal } from '../hooks/reveal';
import { ExternalIcon } from './Icons';

export function Certificates() {
  const { t, l } = useI18n();

  return (
    <section id="certificados" className="section container">
      <h2 className="section-title reveal" ref={reveal}>{t.certs.title}</h2>
      <p className="section-text reveal" ref={reveal}>{t.certs.intro}</p>

      <div className="certs-grid">
        {certificates.map((cert) => (
          <div className="cert-card reveal" ref={reveal} key={cert.id}>
            <div className="cert-icon" aria-hidden="true">{cert.icon}</div>
            <div className="cert-body">
              <span className="cert-platform">{cert.platform}</span>
              <h3 className="cert-name">{l(cert.name)}</h3>
              <span className="cert-date">{l(cert.date)}</span>
            </div>
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link"
              title={t.certs.viewCert}
              aria-label={`${t.certs.viewCert}: ${l(cert.name)}`}
            >
              <ExternalIcon size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
