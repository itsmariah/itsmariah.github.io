import { useCallback, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'portfolio-theme';

// O tema inicial já é aplicado por um script inline no index.html (evita flash);
// aqui só lemos o atributo e cuidamos da troca.
function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

// Store mínima: a navbar e a paleta de comandos trocam o tema e todos os usos se atualizam
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function setTheme(next: Theme) {
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage bloqueado */ }
  listeners.forEach((listener) => listener());
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, currentTheme);

  /** Troca o tema. Com `origin`, o novo tema se revela num círculo que nasce no centro do elemento. */
  const toggle = useCallback((origin?: HTMLElement) => {
    const root = document.documentElement;
    const next: Theme = currentTheme() === 'light' ? 'dark' : 'light';
    // O ícone do botão precisa estar atualizado no "retrato" do novo tema
    const apply = () => flushSync(() => setTheme(next));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!origin || reduceMotion || !('startViewTransition' in document)) {
      apply();
      return;
    }

    const { left, top, width, height } = origin.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add('theme-switching');
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    }, () => {});
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }, []);

  return { theme, toggle };
}
