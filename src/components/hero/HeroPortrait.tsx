import type { CSSProperties, PointerEvent } from 'react';
import { MapPin } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { siJavascript, siReact, siTypescript } from 'simple-icons';

// Selos decorativos que flutuam ao redor da foto (a lista completa fica na seção de tecnologias)
const BADGES = [
  { label: 'React', icon: siReact },
  { label: 'TypeScript', icon: siTypescript },
  { label: 'JavaScript', icon: siJavascript },
];

const SPRING = { stiffness: 150, damping: 18 };

interface HeroPortraitProps {
  alt: string;
  location: string;
  style?: CSSProperties;
}

/** Foto com borda em gradiente girando e inclinação 3D que acompanha o mouse. */
export function HeroPortrait({ alt, location, style }: HeroPortraitProps) {
  // Posição do cursor sobre a foto, de 0 a 1 (0.5 = centro)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), SPRING);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.28), transparent 55%)`;
  const reduceMotion = useReducedMotion();

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - left) / width);
    py.set((e.clientY - top) / height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <figure className="hero-portrait hero-in" style={style} onPointerMove={onPointerMove} onPointerLeave={reset}>
      <motion.div className="portrait-card" style={{ rotateX, rotateY }}>
        <div className="portrait-frame">
          <img
            src="/assets/images/foto_profissional.webp"
            alt={alt}
            width={720}
            height={720}
            fetchPriority="high"
          />
          <motion.div className="portrait-glare" style={{ background: glare }} aria-hidden="true" />
        </div>

        {BADGES.map(({ label, icon }) => (
          <span className="float-badge" key={label} aria-hidden="true">
            <span className="float-badge-inner">
              <svg viewBox="0 0 24 24" style={{ '--brand': `#${icon.hex}` } as CSSProperties}><path d={icon.path} /></svg>
              {label}
            </span>
          </span>
        ))}

        <figcaption className="hero-location">
          <MapPin size={16} aria-hidden="true" />
          {location}
        </figcaption>
      </motion.div>
    </figure>
  );
}
