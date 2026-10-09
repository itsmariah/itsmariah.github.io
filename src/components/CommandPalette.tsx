import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import {
  Copy, CornerDownLeft, FileDown, FolderOpen, House, Languages, Layers, Mail, Route, Search, SunMoon, User,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { format, useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { SECTIONS, sectionLabel, type SectionId } from '../data/sections';
import { useCopyEmail } from '../hooks/useClipboard';
import { useModal } from '../hooks/useModal';
import { useTheme } from '../hooks/useTheme';
import { GitHubIcon, LinkedInIcon } from './Icons';

/** Rótulo do atalho de acordo com o sistema (⌘K no Mac, Ctrl K nos demais). */
export const shortcutLabel = /Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K';

type Group = 'navigate' | 'actions' | 'links';
const GROUPS: Group[] = ['navigate', 'actions', 'links'];

interface Command {
  id: string;
  group: Group;
  label: string;
  icon: ReactNode;
  /** Termos extras para a busca (nos dois idiomas) */
  keywords: string;
  run: () => void;
}

const SECTION_META: Record<SectionId, { icon: ReactNode; keywords: string }> = {
  sobre: { icon: <User size={17} />, keywords: 'about sobre bio' },
  skills: { icon: <Layers size={17} />, keywords: 'skills tecnologias stack' },
  projetos: { icon: <FolderOpen size={17} />, keywords: 'projects projetos portfolio' },
  curriculo: { icon: <Route size={17} />, keywords: 'resume curriculo trajetoria experiencia formacao certificados' },
  contato: { icon: <Mail size={17} />, keywords: 'contact contato email mensagem' },
};

// Busca sem diferenciar maiúsculas e acentos
const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

function scrollToSection(id: SectionId | null) {
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const { t, lang, setLang } = useI18n();
  const { toggle } = useTheme();
  const copyEmail = useCopyEmail();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const p = t.palette;

  useModal(dialogRef, onClose);
  // Depois do useModal (que foca o diálogo), o foco vai para a busca
  useEffect(() => { inputRef.current?.focus(); }, []);

  const commands: Command[] = [
    { id: 'home', group: 'navigate', label: p.home, icon: <House size={17} />, keywords: 'home inicio topo top', run: () => scrollToSection(null) },
    ...SECTIONS.map((id): Command => ({
      id, group: 'navigate', label: sectionLabel(t, id), ...SECTION_META[id], run: () => scrollToSection(id),
    })),
    { id: 'theme', group: 'actions', label: p.toggleTheme, icon: <SunMoon size={17} />, keywords: 'theme tema dark light escuro claro', run: () => toggle() },
    { id: 'lang', group: 'actions', label: p.switchLang, icon: <Languages size={17} />, keywords: 'language idioma english ingles portugues', run: () => setLang(lang === 'pt' ? 'en' : 'pt') },
    { id: 'copy-email', group: 'actions', label: p.copyEmail, icon: <Copy size={17} />, keywords: `email e-mail copy copiar ${profile.email}`, run: () => { void copyEmail(); } },
    {
      id: 'cv', group: 'actions', label: p.downloadCv, icon: <FileDown size={17} />, keywords: 'cv curriculo resume download baixar pdf',
      run: () => {
        const link = document.createElement('a');
        link.href = profile.cvUrl;
        link.download = '';
        link.click();
      },
    },
    { id: 'github', group: 'links', label: 'GitHub', icon: <GitHubIcon size={17} />, keywords: 'github codigo code repositorios', run: () => window.open(profile.links.github, '_blank', 'noopener') },
    { id: 'linkedin', group: 'links', label: 'LinkedIn', icon: <LinkedInIcon size={17} />, keywords: 'linkedin perfil profile', run: () => window.open(profile.links.linkedin, '_blank', 'noopener') },
  ];

  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const filtered = commands.filter((cmd) => {
    const haystack = normalize(`${cmd.label} ${cmd.keywords}`);
    return terms.every((term) => haystack.includes(term));
  });
  const current = filtered[Math.min(active, filtered.length - 1)];
  const optionId = (cmd: Command) => `palette-option-${cmd.id}`;

  // Mantém a opção ativa visível quando a lista rola pelo teclado
  const currentId = current?.id;
  useEffect(() => {
    if (currentId) document.getElementById(`palette-option-${currentId}`)?.scrollIntoView({ block: 'nearest' });
  }, [currentId]);

  const run = (cmd: Command) => {
    onClose();
    cmd.run();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (Math.min(i, filtered.length - 1) + step + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && current) {
      e.preventDefault();
      run(current);
    }
  };

  return (
    <motion.div
      className="palette-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="palette-backdrop" onClick={onClose} />
      <motion.div
        ref={dialogRef}
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        tabIndex={-1}
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="palette-search">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={current ? optionId(current) : undefined}
            aria-label={p.title}
            placeholder={p.placeholder}
            value={query}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
          />
          <kbd className="kbd">esc</kbd>
        </div>

        <div id="palette-list" className="palette-list" role="listbox" aria-label={p.title}>
          {GROUPS.map((group) => {
            const items = filtered.filter((cmd) => cmd.group === group);
            if (items.length === 0) return null;
            return (
              <div role="group" aria-labelledby={`palette-group-${group}`} key={group}>
                <div className="palette-group" id={`palette-group-${group}`} role="presentation">{p.groups[group]}</div>
                {items.map((cmd) => {
                  const selected = cmd === current;
                  return (
                    <div
                      key={cmd.id}
                      id={optionId(cmd)}
                      role="option"
                      aria-selected={selected}
                      className={`palette-item${selected ? ' is-active' : ''}`}
                      onPointerMove={() => setActive(filtered.indexOf(cmd))}
                      onClick={() => run(cmd)}
                    >
                      {/* Destaque que desliza entre as opções */}
                      {selected && (
                        <motion.span
                          layoutId="palette-highlight"
                          className="palette-highlight"
                          transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                        />
                      )}
                      <span className="palette-icon" aria-hidden="true">{cmd.icon}</span>
                      <span className="palette-label">{cmd.label}</span>
                      {selected && <CornerDownLeft className="palette-enter" size={15} aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="palette-empty">{format(p.empty, { query })}</p>}
        </div>

        <div className="palette-footer" aria-hidden="true">
          <span><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> {p.hintNavigate}</span>
          <span><kbd className="kbd">↵</kbd> {p.hintSelect}</span>
          <span><kbd className="kbd">esc</kbd> {p.hintClose}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Paleta de comandos (Ctrl K / ⌘K): navegar pelas seções e executar ações rápidas. */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  return <AnimatePresence>{open && <PaletteDialog onClose={close} />}</AnimatePresence>;
}
