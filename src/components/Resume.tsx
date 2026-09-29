import { useRef, useState, type KeyboardEvent } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { education, experience, softSkills, type TimelineItem } from '../data/resume';
import { reveal } from '../hooks/reveal';

const TABS = ['education', 'experience', 'soft'] as const;
type Tab = (typeof TABS)[number];

function Timeline({ items }: { items: TimelineItem[] }) {
  const { l } = useI18n();
  return (
    <>
      {items.map((item) => (
        <div className="resume-item" key={item.id}>
          <div className="resume-dot" aria-hidden="true"></div>
          <div className="resume-item-body">
            <span className="resume-period">{l(item.period)}</span>
            <h3>{l(item.title)}</h3>
            <p>{l(item.description)}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export function Resume() {
  const { t, l } = useI18n();
  const [active, setActive] = useState<Tab>('education');
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ education: null, experience: null, soft: null });

  // Setas esquerda/direita alternam entre as abas (padrão WAI-ARIA de tabs)
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const next = TABS[(TABS.indexOf(active) + step + TABS.length) % TABS.length];
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="curriculo" className="section container">
      <h2 className="section-title reveal" ref={reveal}>{t.resume.title}</h2>

      <div className="resume-tabs reveal" ref={reveal} role="tablist" onKeyDown={onKeyDown}>
        {TABS.map((tab) => (
          <button
            key={tab}
            ref={(el) => { tabRefs.current[tab] = el; }}
            type="button"
            role="tab"
            id={`tab-${tab}`}
            aria-selected={active === tab}
            aria-controls={`panel-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            className={`resume-tab${active === tab ? ' active' : ''}`}
            onClick={() => setActive(tab)}
          >
            {t.resume.tabs[tab]}
          </button>
        ))}
      </div>

      <div
        className="resume-panel active"
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        key={active}
      >
        {active === 'education' && <Timeline items={education} />}
        {active === 'experience' && <Timeline items={experience} />}
        {active === 'soft' && (
          <ul className="soft-skills-grid">
            {softSkills.map((skill) => <li className="soft-card" key={skill.pt}>{l(skill)}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
