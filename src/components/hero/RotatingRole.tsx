import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';

const INTERVAL_MS = 2800;

/**
 * Alterna entre as frases com uma transição suave. É só visual (aria-hidden):
 * quem usa o componente deve oferecer o texto principal para leitores de tela.
 */
export function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [roles.length, reduceMotion]);

  const current = roles[index % roles.length];

  return (
    <span className="rotating-role" aria-hidden="true">
      {/* Cópias invisíveis reservam o espaço da frase mais longa: nada "pula" na troca */}
      {roles.map((role) => <span className="rotating-ghost" key={role}>{role}</span>)}
      <AnimatePresence initial={false}>
        <m.span
          key={current}
          className="rotating-word text-gradient"
          initial={{ opacity: 0, y: '0.6em', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-0.6em', filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {current}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
