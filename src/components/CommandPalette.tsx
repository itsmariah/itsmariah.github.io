import { lazy, Suspense, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { prefetchWhenIdle } from '../utils/prefetch';

/** Rótulo do atalho de acordo com o sistema (⌘K no Mac, Ctrl K nos demais). */
export const shortcutLabel = /Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K';

// O diálogo só é baixado quando o navegador fica ocioso (ou na primeira abertura)
const loadDialog = () => import('./PaletteDialog');
const PaletteDialog = lazy(() => loadDialog().then((mod) => ({ default: mod.PaletteDialog })));

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

  useEffect(() => prefetchWhenIdle(loadDialog), []);

  return (
    <Suspense fallback={null}>
      <AnimatePresence>{open && <PaletteDialog onClose={close} />}</AnimatePresence>
    </Suspense>
  );
}
