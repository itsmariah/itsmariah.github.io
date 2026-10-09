/** Minúsculas e sem acentos, para comparar textos como uma pessoa compararia. */
export const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/**
 * true se o texto contém todas as palavras da busca, em qualquer ordem
 * (sem diferenciar maiúsculas e acentos). Busca vazia combina com tudo.
 */
export function matchesQuery(text: string, query: string) {
  const haystack = normalize(text);
  return normalize(query).split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}
