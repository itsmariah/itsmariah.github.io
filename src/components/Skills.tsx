import { useI18n } from '../i18n/I18nProvider';
import { skillGroups } from '../data/skills';
import { reveal } from '../hooks/reveal';

export function Skills() {
  const { t, l } = useI18n();

  return (
    <section id="skills" className="section container">
      <h2 className="section-title reveal" ref={reveal}>{t.skills.title}</h2>
      <div className="skills-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.id}>
            <h3 className="skill-group-title">{l(group.title)}</h3>
            <ul className="skills-grid">
              {group.items.map((item) => (
                <li className="skill-card reveal" ref={reveal} key={l(item)}>{l(item)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
