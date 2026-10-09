import { useEffect } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { burstConfetti } from '../effects/confetti';
import { useToast } from './Toast';

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** Easter egg do código Konami: confete nas cores do site e um recado. Não renderiza nada. */
export function KonamiEasterEgg() {
  const { t } = useI18n();
  const notify = useToast();

  useEffect(() => {
    let position = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[position]) {
        position++;
      } else if (key === 'ArrowUp') {
        // Um ↑ a mais no começo (↑↑↑↓…) ainda conta como início válido
        position = position === 2 ? 2 : 1;
      } else {
        position = 0;
      }

      if (position === SEQUENCE.length) {
        position = 0;
        notify(t.easterEgg.konami);
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) burstConfetti();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [notify, t]);

  return null;
}
