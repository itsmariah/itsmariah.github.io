import { describe, expect, it } from 'vitest';
import { matchesQuery, normalize } from './search';

describe('normalize', () => {
  it('remove acentos e passa para minúsculas', () => {
    expect(normalize('Trajetória ÁÉÍÕÇ')).toBe('trajetoria aeioc');
  });
});

describe('matchesQuery', () => {
  const text = 'Alternar tema claro/escuro theme dark light';

  it('ignora acentos e maiúsculas na busca e no texto', () => {
    expect(matchesQuery('Trajetória', 'TRAJETORIA')).toBe(true);
    expect(matchesQuery('curriculo', 'currículo')).toBe(true);
  });

  it('exige todas as palavras, em qualquer ordem', () => {
    expect(matchesQuery(text, 'escuro tema')).toBe(true);
    expect(matchesQuery(text, 'tema idioma')).toBe(false);
  });

  it('encontra pedaços de palavras', () => {
    expect(matchesQuery(text, 'esc')).toBe(true);
    expect(matchesQuery(text, 'altern cla')).toBe(true);
  });

  it('busca vazia ou só com espaços combina com tudo', () => {
    expect(matchesQuery(text, '')).toBe(true);
    expect(matchesQuery(text, '   ')).toBe(true);
  });
});
