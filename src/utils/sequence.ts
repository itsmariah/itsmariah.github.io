/**
 * Detecta uma sequência de teclas (ex.: código Konami). Devolve uma função que recebe cada
 * tecla pressionada e retorna true quando as últimas teclas formam a sequência inteira.
 * Letras são comparadas sem diferenciar maiúsculas.
 */
export function createSequenceMatcher(sequence: readonly string[]) {
  let recent: string[] = [];

  return (rawKey: string) => {
    const key = rawKey.length === 1 ? rawKey.toLowerCase() : rawKey;
    // Guarda só as últimas N teclas: teclas extras antes (↑ ↑ ↑ ↓ …) não atrapalham
    recent = [...recent, key].slice(-sequence.length);
    if (recent.length === sequence.length && recent.every((k, i) => k === sequence[i])) {
      recent = [];
      return true;
    }
    return false;
  };
}
