import { describe, expect, it } from 'vitest';
import { relativeTime } from './relativeTime';

const NOW = Date.parse('2026-10-09T12:00:00Z');
const ago = (ms: number) => new Date(NOW - ms).toISOString();
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe('relativeTime', () => {
  it('escreve em português', () => {
    expect(relativeTime(ago(3 * HOUR), 'pt', NOW)).toBe('há 3 horas');
    expect(relativeTime(ago(DAY), 'pt', NOW)).toBe('ontem');
    expect(relativeTime(ago(3 * DAY), 'pt', NOW)).toBe('há 3 dias');
  });

  it('escreve em inglês', () => {
    expect(relativeTime(ago(3 * HOUR), 'en', NOW)).toBe('3 hours ago');
    expect(relativeTime(ago(DAY), 'en', NOW)).toBe('yesterday');
    expect(relativeTime(ago(3 * DAY), 'en', NOW)).toBe('3 days ago');
  });

  it('usa a maior unidade que cabe', () => {
    expect(relativeTime(ago(14 * DAY), 'en', NOW)).toBe('2 weeks ago');
    expect(relativeTime(ago(90 * DAY), 'en', NOW)).toBe('3 months ago');
    expect(relativeTime(ago(400 * DAY), 'en', NOW)).toBe('last year');
  });

  it('menos de um minuto é "agora"', () => {
    expect(relativeTime(ago(10_000), 'pt', NOW)).toBe('agora');
    expect(relativeTime(ago(10_000), 'en', NOW)).toBe('now');
  });
});
