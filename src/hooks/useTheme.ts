import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'portfolio-theme';

// O tema inicial já é aplicado por um script inline no index.html (evita flash);
// aqui só lemos o atributo e cuidamos da troca.
function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  /** Troca o tema. Com `origin`, o novo tema se revela num círculo que nasce no centro do elemento. */
  const toggle = useCallback((origin?: HTMLElement) => {
    const root = document.documentElement;
    const next: Theme = currentTheme() === 'light' ? 'dark' : 'light';
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage bloqueado */ }

    const apply = () => {
      root.setAttribute('data-theme', next);
      // O ícone do botão precisa estar atualizado no "retrato" do novo tema
      flushSync(() => setTheme(next));
    };

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
