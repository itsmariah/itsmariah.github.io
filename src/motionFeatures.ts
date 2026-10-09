// Recursos do Motion (animações de layout, gestos, exit…) num arquivo à parte:
// o LazyMotion do main.tsx baixa isto depois da primeira pintura, fora do bundle inicial.
import { domMax } from 'motion/react';

export default domMax;
