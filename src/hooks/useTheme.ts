import { useCallback, useState } from 'react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'portfolio-theme';

// O tema inicial já é aplicado por um script inline no index.html (evita flash);
// aqui só lemos o atributo e cuidamos da troca.
function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage bloqueado */ }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
