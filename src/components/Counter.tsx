import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

/**
 * Número que conta de 0 até `value` quando aparece na tela. É só visual (aria-hidden):
 * quem usa deve oferecer o valor final para leitores de tela.
 */
export function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduceMotion) {
      el.textContent = String(value);
      return;
    }
    // Escreve direto no DOM: evita re-renderizar a cada frame da contagem
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { el.textContent = String(Math.round(v)); },
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return <span ref={ref} aria-hidden="true">0</span>;
}
