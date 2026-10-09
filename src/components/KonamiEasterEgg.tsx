import { useEffect } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { burstConfetti } from '../effects/confetti';
import { createSequenceMatcher } from '../utils/sequence';
import { useToast } from './Toast';

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** Easter egg do código Konami: confete nas cores do site e um recado. Não renderiza nada. */
export function KonamiEasterEgg() {
  const { t } = useI18n();
  const notify = useToast();

  useEffect(() => {
    const matches = createSequenceMatcher(SEQUENCE);

    const onKeyDown = (e: KeyboardEvent) => {
      if (matches(e.key)) {
        notify(t.easterEgg.konami);
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) burstConfetti();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [notify, t]);

  return null;
}
