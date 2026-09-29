import { GraduationCap, Hammer, MapPin, Target, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { reveal } from '../hooks/reveal';

export function About() {
  const { t } = useI18n();
  const f = t.about.facts;

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: GraduationCap, label: f.education, value: f.educationValue },
    { icon: MapPin, label: f.location, value: t.hero.location },
    { icon: Target, label: f.focus, value: f.focusValue },
    { icon: Hammer, label: f.now, value: f.nowValue },
  ];

  return (
    <section id="sobre" className="section container">
      <h2 className="section-title reveal" ref={reveal}>{t.about.title}</h2>
      <div className="about-grid">
        <div className="about-text reveal" ref={reveal}>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>
        <dl className="facts reveal" ref={reveal}>
          {facts.map(({ icon: Icon, label, value }) => (
            <div className="fact" key={label}>
              <span className="fact-icon" aria-hidden="true"><Icon size={18} /></span>
              <div>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
