import { Award, Briefcase, ExternalLink, GraduationCap, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { education, experience, type TimelineItem } from '../data/resume';
import { certificates } from '../data/certificates';
import { reveal } from '../hooks/reveal';

function ColumnTitle({ icon: Icon, children, id }: { icon: LucideIcon; children: string; id?: string }) {
  return (
    <h3 className="journey-title" id={id}>
      <span className="journey-icon" aria-hidden="true"><Icon size={18} /></span>
      {children}
    </h3>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  const { l } = useI18n();
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li className="timeline-item" key={item.id}>
          <span className="timeline-period">{l(item.period)}</span>
          <h4 className="timeline-role">{l(item.title)}</h4>
          <p className="timeline-description">{l(item.description)}</p>
        </li>
      ))}
    </ol>
  );
}

export function Resume() {
  const { t, l } = useI18n();

  return (
    <section id="curriculo" className="section container">
      <div className="section-head reveal" ref={reveal}>
        <h2 className="section-title">{t.resume.title}</h2>
        <p className="section-intro">{t.resume.intro}</p>
      </div>

      <div className="journey-grid">
        <div className="journey-col reveal" ref={reveal}>
          <ColumnTitle icon={Briefcase}>{t.resume.experience}</ColumnTitle>
          <Timeline items={experience} />
        </div>

        <div className="journey-col reveal" ref={reveal}>
          <ColumnTitle icon={GraduationCap}>{t.resume.education}</ColumnTitle>
          <Timeline items={education} />

          {/* id mantido para links antigos que apontavam para /#certificados */}
          <ColumnTitle icon={Award} id="certificados">{t.resume.courses}</ColumnTitle>
          <ul className="cert-list">
            {certificates.map(({ id, icon: Icon, platform, name, date, file }) => (
              <li className="cert-item" key={id}>
                <span className="cert-icon" aria-hidden="true"><Icon size={18} /></span>
                <div className="cert-text">
                  <span className="cert-name">{l(name)}</span>
                  <span className="cert-meta">{platform} · {l(date)}</span>
                </div>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  title={t.resume.viewCert}
                  aria-label={`${t.resume.viewCert}: ${l(name)} (PDF)`}
                >
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
