import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { projectIdFromHash, projectUrl, useProjectRoute } from './useProjectRoute';

const IDS = new Set(['geldtrack', 'skillupdev']);

describe('projectIdFromHash / projectUrl', () => {
  it('lê o id do hash #projeto/<id>', () => {
    window.history.replaceState(null, '', '/#projeto/geldtrack');
    expect(projectIdFromHash()).toBe('geldtrack');
  });

  it('ignora hashes que não são de projeto', () => {
    window.history.replaceState(null, '', '/#contato');
    expect(projectIdFromHash()).toBeNull();
  });

  it('monta o link compartilhável', () => {
    expect(projectUrl('geldtrack')).toBe(`${window.location.origin}/#projeto/geldtrack`);
  });
});

describe('useProjectRoute', () => {
  it('abrir grava o projeto na URL; fechar volta no histórico', async () => {
    const { result } = renderHook(() => useProjectRoute(IDS));
    expect(result.current.openId).toBeNull();

    act(() => result.current.open('geldtrack'));
    expect(result.current.openId).toBe('geldtrack');
    expect(window.location.hash).toBe('#projeto/geldtrack');

    act(() => result.current.close());
    await waitFor(() => expect(result.current.openId).toBeNull());
    expect(window.location.hash).toBe('');
  });

  it('chegando por um link, abre o projeto e fechar só limpa o hash', () => {
    window.history.replaceState(null, '', '/#projeto/skillupdev');
    const { result } = renderHook(() => useProjectRoute(IDS));
    expect(result.current.openId).toBe('skillupdev');

    act(() => result.current.close());
    expect(result.current.openId).toBeNull();
    expect(window.location.hash).toBe('');
  });

  it('ignora links de projetos que não existem', () => {
    window.history.replaceState(null, '', '/#projeto/nao-existe');
    const { result } = renderHook(() => useProjectRoute(IDS));
    expect(result.current.openId).toBeNull();
  });
});
