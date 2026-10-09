import type { CSSProperties } from 'react';
import { MapPin } from 'lucide-react';
import { motion, useMotionTemplate, useTransform } from 'motion/react';
import { siJavascript, siReact, siTypescript } from 'simple-icons';
import { useTilt } from '../../hooks/useTilt';

// Selos decorativos que flutuam ao redor da foto (a lista completa fica na seção de tecnologias)
const BADGES = [
  { label: 'React', icon: siReact },
  { label: 'TypeScript', icon: siTypescript },
  { label: 'JavaScript', icon: siJavascript },
];

interface HeroPortraitProps {
  alt: string;
  location: string;
  style?: CSSProperties;
}

/** Foto com borda em gradiente girando e inclinação 3D que acompanha o mouse. */
export function HeroPortrait({ alt, location, style }: HeroPortraitProps) {
  const { px, py, rotateX, rotateY, handlers } = useTilt(8);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.28), transparent 55%)`;

  return (
    <figure className="hero-portrait hero-in" style={style} {...handlers}>
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
