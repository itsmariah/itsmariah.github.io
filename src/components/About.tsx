import { GraduationCap, Hammer, MapPin, Target, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { softSkills } from '../data/resume';
import { projects } from '../data/projects';
import { certificates } from '../data/certificates';
import { skillTiers } from '../data/skills';
import { reveal } from '../hooks/reveal';
import { Counter } from './Counter';

const technologyCount = skillTiers.reduce((sum, tier) => sum + tier.skills.length, 0);

export function About() {
  const { t, l } = useI18n();
  const f = t.about.facts;

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: GraduationCap, label: f.education, value: f.educationValue },
    { icon: MapPin, label: f.location, value: t.hero.location },
    { icon: Target, label: f.focus, value: f.focusValue },
    { icon: Hammer, label: f.now, value: f.nowValue },
  ];

  const stats = [
    { value: projects.length, label: t.about.stats.projects },
    { value: certificates.length, label: t.about.stats.certificates },
    { value: technologyCount, label: t.about.stats.technologies },
  ];

  return (
    <section id="sobre" className="section container">
      <h2 className="section-title reveal" ref={reveal}>
        <span className="section-num" aria-hidden="true">01</span>
        {t.about.title}
      </h2>
      <div className="about-grid">
        <div className="about-text reveal" ref={reveal}>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>

          <h3 className="tier-title about-subtitle">{t.about.softSkills}</h3>
          <ul className="soft-skills stagger">
            {softSkills.map(({ icon: Icon, label }) => (
              <li key={label.pt}>
                <Icon size={15} aria-hidden="true" />
                {l(label)}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-side">
          <ul className="facts spotlight stagger reveal" ref={reveal}>
            {facts.map(({ icon: Icon, label, value }) => (
              <li className="fact" key={label}>
                <span className="fact-icon" aria-hidden="true"><Icon size={18} /></span>
                <div>
                  <span className="fact-label">{label}</span>
                  <span className="fact-value">{value}</span>
                </div>
              </li>
            ))}
          </ul>

          <ul className="stats stagger reveal" ref={reveal}>
            {stats.map(({ value, label }) => (
              <li className="stat spotlight" key={label}>
                <span className="stat-value text-gradient">
                  <Counter value={value} />
                  <span className="visually-hidden">{value}</span>
                </span>
                <span className="stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
