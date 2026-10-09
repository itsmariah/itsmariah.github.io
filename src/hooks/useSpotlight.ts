import { useEffect } from 'react';

/**
 * Um único listener para todos os elementos com a classe .spotlight: grava a posição do
 * mouse em --mx/--my no elemento sob o cursor, e o CSS desenha o brilho ali.
 */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      const target = last?.target;
      if (!(target instanceof Element) || !last) return;
      const el = target.closest<HTMLElement>('.spotlight');
      if (!el) return;
      const { left, top } = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${last.clientX - left}px`);
      el.style.setProperty('--my', `${last.clientY - top}px`);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      last = e;
      frame ||= requestAnimationFrame(update);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
