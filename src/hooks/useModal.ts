import { useEffect, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Comportamento de modal enquanto o componente estiver montado:
 * trava o scroll da página, prende o Tab dentro de `ref`, fecha com Esc
 * e, ao desmontar, devolve o foco para o elemento que abriu o modal.
 */
export function useModal(ref: RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusables = () => [...node.querySelectorAll<HTMLElement>(FOCUSABLE)];

    document.documentElement.style.overflow = 'hidden';
    // Foca o próprio diálogo (precisa de tabIndex={-1}); o leitor de tela anuncia o título
    node.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
      previousFocus?.focus({ preventScroll: true });
    };
  }, [ref, onClose]);
}
