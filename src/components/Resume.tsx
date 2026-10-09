import { useRef } from 'react';
import { Award, Briefcase, ExternalLink, GraduationCap, type LucideIcon } from 'lucide-react';
import { m, useInView, useScroll, type MotionStyle } from 'motion/react';
import { useI18n } from '../i18n/I18nProvider';
import { education, experience, type TimelineItem } from '../data/resume';
import { certificates } from '../data/certificates';
import { reveal } from '../hooks/reveal';

// Linha imaginária a 65% da altura da tela: a linha da timeline cresce até ela
// e cada ponto acende quando o item a cruza (os dois valores abaixo andam juntos)
const SCROLL_OFFSET = ['start 65%', 'end 65%'] as const;
const LIT_MARGIN = '0px 0px -35% 0px';

function ColumnTitle({ icon: Icon, children, id }: { icon: LucideIcon; children: string; id?: string }) {
  return (
    <h3 className="journey-title" id={id}>
      <span className="journey-icon" aria-hidden="true"><Icon size={18} /></span>
      {children}
    </h3>
  );
}

function TimelineEntry({ item }: { item: TimelineItem }) {
  const { l } = useI18n();
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { margin: LIT_MARGIN });

  return (
    <li className={`timeline-item${lit ? ' is-lit' : ''}`} ref={ref}>
      <span className="timeline-period">{l(item.period)}</span>
      <h4 className="timeline-role">{l(item.title)}</h4>
      <p className="timeline-description">{l(item.description)}</p>
    </li>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [...SCROLL_OFFSET] });

  return (
    <m.ol className="timeline" ref={ref} style={{ '--progress': scrollYProgress } as MotionStyle}>
      {items.map((item) => <TimelineEntry item={item} key={item.id} />)}
    </m.ol>
  );
}

export function Resume() {
  const { t, l } = useI18n();

  return (
    <section id="curriculo" className="section container">
      <div className="section-head reveal" ref={reveal}>
        <h2 className="section-title">
          <span className="section-num" aria-hidden="true">04</span>
          {t.resume.title}
        </h2>
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
          <ul className="cert-list spotlight stagger">
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
