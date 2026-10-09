import { describe, expect, it } from 'vitest';
import { createSequenceMatcher } from './sequence';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** Digita as teclas e devolve em quais posições a sequência foi completada */
function type(keys: string[]) {
  const matches = createSequenceMatcher(KONAMI);
  return keys.flatMap((key, i) => (matches(key) ? [i] : []));
}

describe('createSequenceMatcher', () => {
  it('completa na última tecla da sequência', () => {
    expect(type(KONAMI)).toEqual([KONAMI.length - 1]);
  });

  it('aceita letras maiúsculas (Caps Lock ligado)', () => {
    expect(type([...KONAMI.slice(0, -2), 'B', 'A'])).toEqual([KONAMI.length - 1]);
  });

  it('não completa com uma tecla errada no meio', () => {
    expect(type(['ArrowUp', 'ArrowUp', 'ArrowDown', 'x', 'ArrowDown', ...KONAMI.slice(4)])).toEqual([]);
  });

  it('teclas extras antes não atrapalham (↑ ↑ ↑ ↓ …)', () => {
    expect(type(['x', 'ArrowUp', ...KONAMI])).toEqual([KONAMI.length + 1]);
  });

  it('recomeça depois de completar: dá para repetir', () => {
    expect(type([...KONAMI, ...KONAMI])).toEqual([KONAMI.length - 1, 2 * KONAMI.length - 1]);
  });
});
