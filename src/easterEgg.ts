import { profile } from './data/profile';

// Recado para quem abre o DevTools para ver como o site foi feito
export function printConsoleGreeting() {
  const title = [
    'font: 700 22px/1.4 system-ui, sans-serif',
    'color: #fff',
    'padding: 10px 18px',
    'border-radius: 10px',
    'background: linear-gradient(110deg, #6d5ae6, #b5359a 60%, #0e7490)',
  ].join(';');
  const body = 'font: 14px/1.6 system-ui, sans-serif; color: #8b7cf6';

  console.log('%citsmariah.', title);
  console.log(
    [
      '%cOlá, dev curioso(a)! 👋 Que bom te ver por aqui.',
      'Hi there, curious dev! Nice to see you poking around.',
      '',
      `🧩 Código-fonte / source: ${profile.links.github}/itsmariah.github.io`,
      `✉️  Vamos conversar? / Let's talk: ${profile.email}`,
      '⌨️  Dica / tip: Ctrl K (⌘K) abre a paleta de comandos.',
      '🎮 Psst… ↑ ↑ ↓ ↓ ← → ← → B A',
    ].join('\n'),
    body,
  );
}
