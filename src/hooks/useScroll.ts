import { useEffect, useRef, useState } from 'react';

/** Chama `onFrame` no máximo uma vez por frame durante o scroll, com a fração rolada da página (0–1). */
export function useScrollFrame(onFrame: (scrollY: number, progress: number) => void) {
  const callbackRef = useRef(onFrame);
  useEffect(() => { callbackRef.current = onFrame; });

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      callbackRef.current(scrollY, total > 0 ? scrollY / total : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

/** true quando a página rolou além de `threshold` px. Só re-renderiza quando o valor muda. */
export function useScrolledPast(threshold: number) {
  const [past, setPast] = useState(false);
  useScrollFrame((scrollY) => setPast(scrollY > threshold));
  return past;
}
