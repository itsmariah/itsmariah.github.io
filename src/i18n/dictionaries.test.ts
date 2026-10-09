import { describe, expect, it } from 'vitest';
import { format } from './I18nProvider';
import { pt } from './pt';
import { en } from './en';

/** Todas as strings do dicionário, com o caminho de cada uma (ex.: "hero.roles.0") */
function strings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => strings(child, path ? `${path}.${key}` : key));
  }
  return [];
}

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('dicionários', () => {
  const ptStrings = new Map(strings(pt));
  const enStrings = new Map(strings(en));

  it('PT e EN têm exatamente as mesmas chaves', () => {
    expect([...enStrings.keys()].sort()).toEqual([...ptStrings.keys()].sort());
  });

  it('nenhum texto está vazio', () => {
    for (const [path, text] of [...ptStrings, ...enStrings]) expect(text.trim(), path).not.toBe('');
  });

  it('as variáveis ({count}, {tag}…) são as mesmas nas duas línguas', () => {
    for (const [path, text] of ptStrings) {
      expect(placeholders(enStrings.get(path) ?? ''), path).toEqual(placeholders(text));
    }
  });
});

describe('format', () => {
  it('substitui as variáveis', () => {
    expect(format('{count} projetos com {tag}', { count: 3, tag: 'React' })).toBe('3 projetos com React');
  });

  it('mantém variáveis que não foram informadas', () => {
    expect(format('Olá, {nome}', {})).toBe('Olá, {nome}');
  });
});
