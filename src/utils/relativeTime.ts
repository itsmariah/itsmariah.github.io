import type { Lang } from '../i18n/I18nProvider';

const DAY_S = 86_400;
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * DAY_S],
  ['month', 30 * DAY_S],
  ['week', 7 * DAY_S],
  ['day', DAY_S],
  ['hour', 3_600],
  ['minute', 60],
];

/** "há 3 dias" / "3 days ago", "ontem" / "yesterday"… a partir de uma data ISO. */
export function relativeTime(iso: string, lang: Lang, now = Date.now()) {
  const seconds = (Date.parse(iso) - now) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang === 'pt' ? 'pt-BR' : 'en', { numeric: 'auto' });
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return rtf.format(0, 'second');
}
