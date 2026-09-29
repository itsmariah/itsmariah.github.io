import { format, useI18n } from '../i18n/I18nProvider';
import { practices, skillTiers, type Skill } from '../data/skills';
import { reveal } from '../hooks/reveal';
import { projectCountByTag, useProjectFilter } from './projects/ProjectFilter';

function SkillLogo({ skill }: { skill: Skill }) {
  if (skill.icon) {
    return (
      <svg className="skill-logo" viewBox="0 0 24 24" aria-hidden="true">
        <path d={skill.icon.path} />
      </svg>
    );
  }
  return <span className="skill-logo skill-monogram" aria-hidden="true">{skill.monogram}</span>;
}

function SkillChip({ skill }: { skill: Skill }) {
  const { t } = useI18n();
  const { showProjectsWith } = useProjectFilter();
  const tag = skill.tag ?? skill.name;
  const count = projectCountByTag.get(tag) ?? 0;

  // Tecnologias sem projeto no portfólio aparecem, mas não são clicáveis
  if (count === 0) {
    return (
      <div className="skill-chip">
        <SkillLogo skill={skill} />
        <span className="skill-name">{skill.name}</span>
      </div>
    );
  }

  const countLabel = count === 1
    ? t.skills.projectCount.one
    : format(t.skills.projectCount.other, { count });

  return (
    <button
      type="button"
      className="skill-chip is-link"
      aria-label={`${format(t.skills.showProjects, { name: skill.name })} (${countLabel})`}
      onClick={() => showProjectsWith(tag)}
    >
      <SkillLogo skill={skill} />
      <span className="skill-text">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-count">{countLabel}</span>
      </span>
    </button>
  );
}

export function Skills() {
  const { t, l } = useI18n();

  return (
    <section id="skills" className="section container">
      <div className="section-head reveal" ref={reveal}>
        <h2 className="section-title">{t.skills.title}</h2>
        <p className="section-intro">{t.skills.intro}</p>
      </div>

      <div className="skill-tiers">
        {skillTiers.map((tier) => (
          <div className="skill-tier reveal" ref={reveal} key={tier.id}>
            <h3 className="tier-title">{t.skills.tiers[tier.id]}</h3>
            <ul className="skill-grid">
              {tier.skills.map((skill) => (
                <li key={skill.name}><SkillChip skill={skill} /></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="skill-tier reveal" ref={reveal}>
          <h3 className="tier-title">{t.skills.tiers.practices}</h3>
          <ul className="practice-list">
            {practices.map((p) => <li key={p.pt}>{l(p)}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
