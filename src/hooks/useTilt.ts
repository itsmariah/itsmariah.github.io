import type { PointerEvent } from 'react';
import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

const SPRING = { stiffness: 150, damping: 18 };

/**
 * Inclinação 3D que acompanha o mouse. Os handlers vão num elemento que não gira
 * (o "palco"); rotateX/rotateY vão no elemento inclinado.
 */
export function useTilt(maxDeg = 8) {
  // Posição do cursor sobre o palco, de 0 a 1 (0.5 = centro)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxDeg, -maxDeg]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxDeg * 1.25, maxDeg * 1.25]), SPRING);
  const reduceMotion = useReducedMotion();

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - left) / width);
    py.set((e.clientY - top) / height);
  };

  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return { px, py, rotateX, rotateY, handlers: { onPointerMove, onPointerLeave } };
}
