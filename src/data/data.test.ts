import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import { skillTiers } from './skills';
import { certificates } from './certificates';

// Arquivos que existem em public/ (só os nomes: nada é importado de fato)
const publicFiles = new Set(
  Object.keys(import.meta.glob('/public/**/*.{webp,png,jpg,avif,pdf,PDF}')).map((path) => path.replace('/public', '')),
);

const localized = (text: { pt: string; en: string }) => text.pt.trim() !== '' && text.en.trim() !== '';

describe('projetos', () => {
  it('têm ids únicos (o id vai na URL do modal)', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('os ids funcionam na URL sem codificação', () => {
    for (const { id } of projects) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it('projetos em destaque têm imagens', () => {
    for (const p of projects.filter((p) => p.featured)) expect(p.images.length, p.name).toBeGreaterThan(0);
  });

  it('todas as imagens existem em public/', () => {
    for (const p of projects) {
      for (const image of p.images) expect(publicFiles.has(image.src), image.src).toBe(true);
    }
  });

  it('textos estão preenchidos nos dois idiomas', () => {
    for (const p of projects) {
      expect(localized(p.description), p.name).toBe(true);
      p.highlights.forEach((h) => expect(localized(h), p.name).toBe(true));
      if (p.origin) expect(localized(p.origin), p.name).toBe(true);
      if (p.story) Object.values(p.story).forEach((part) => expect(localized(part), p.name).toBe(true));
    }
  });

  it('todo repositório aponta para o GitHub (usado no selo de atividade)', () => {
    for (const p of projects) expect(p.repoUrl, p.name).toMatch(/^https:\/\/github\.com\/[^/]+\/[^/]+$/);
  });

  it('toda tecnologia usada num projeto aparece na seção de tecnologias', () => {
    const skillTags = new Set(skillTiers.flatMap((tier) => tier.skills.map((s) => s.tag ?? s.name)));
    for (const p of projects) {
      for (const tag of p.tags) expect(skillTags.has(tag), `${p.name}: ${tag}`).toBe(true);
    }
  });
});

describe('certificados', () => {
  it('todos os PDFs existem em public/', () => {
    for (const c of certificates) expect(publicFiles.has(c.file), c.file).toBe(true);
  });
});
