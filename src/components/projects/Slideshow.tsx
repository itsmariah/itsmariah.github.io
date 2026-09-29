import { useRef, useState } from 'react';
import { format, useI18n } from '../../i18n/I18nProvider';
import type { Project } from '../../data/projects';

interface SlideshowProps {
  project: Project;
  onOpen: (index: number) => void;
}

export function Slideshow({ project, onOpen }: SlideshowProps) {
  const { t, l } = useI18n();
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const { images, placeholder } = project;
  const total = images.length;
  const goTo = (idx: number) => setCurrent((idx + total) % total);

  // Sem imagens: só a capa com emoji e gradiente
  if (total === 0) {
    return (
      <div className="project-slideshow">
        <div className="slides-track">
          <div className={`slide active ${placeholder.className}`}>
            <span className="slide-emoji" aria-hidden="true">{placeholder.emoji}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="project-slideshow has-images"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      }}
    >
      <div className={`project-thumb ${placeholder.className}`}>
        <span className="slide-emoji" aria-hidden="true">{placeholder.emoji}</span>
      </div>

      <div className="slides-track">
        {images.map((image, idx) => (
          <div className={`slide${idx === current ? ' active' : ''}`} key={image.src}>
            <img
              src={image.src}
              alt={`${project.name} — ${l(image.caption)}`}
              loading="lazy"
              decoding="async"
              onClick={() => onOpen(idx)}
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button type="button" className="slide-btn prev" aria-label={t.slideshow.prev} onClick={() => goTo(current - 1)}>&#8249;</button>
          <button type="button" className="slide-btn next" aria-label={t.slideshow.next} onClick={() => goTo(current + 1)}>&#8250;</button>
          <div className="slide-dots">
            {images.map((image, idx) => (
              <button
                type="button"
                key={image.src}
                className={`dot${idx === current ? ' active' : ''}`}
                aria-label={format(t.slideshow.goTo, { n: idx + 1, total })}
                aria-current={idx === current ? 'true' : undefined}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
