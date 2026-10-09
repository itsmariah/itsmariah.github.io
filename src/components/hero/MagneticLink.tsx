import type { PointerEvent } from 'react';
import { m, useReducedMotion, useSpring, type HTMLMotionProps } from 'motion/react';

const SPRING = { stiffness: 220, damping: 15, mass: 0.4 };

/** Link que é "atraído" pelo cursor do mouse enquanto ele passa por cima. */
export function MagneticLink({ strength = 0.3, ...props }: HTMLMotionProps<'a'> & { strength?: number }) {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const reduceMotion = useReducedMotion();

  const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * strength);
    y.set((e.clientY - (top + height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return <m.a {...props} style={{ x, y }} onPointerMove={onPointerMove} onPointerLeave={reset} />;
}
