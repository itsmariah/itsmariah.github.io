import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { domMax, LazyMotion, MotionConfig } from 'motion/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { I18nProvider } from '../i18n/I18nProvider';
import { CommandPalette } from './CommandPalette';
import { ToastProvider } from './Toast';

// Mesmos provedores do main.tsx, com os recursos do Motion carregados na hora
function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="always">
        <I18nProvider>
          <ToastProvider>
            <CommandPalette open={open} onOpenChange={setOpen} />
          </ToastProvider>
        </I18nProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

describe('CommandPalette', () => {
  beforeEach(() => {
    localStorage.setItem('portfolio-lang', 'pt');
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  it('abre com Ctrl K e fecha com Esc', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.keyboard('{Control>}k{/Control}');
    const input = await screen.findByRole('combobox');
    expect(input).toHaveFocus();
    expect(screen.getByRole('dialog', { name: 'Paleta de comandos' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('filtra sem acentos e executa a opção com Enter', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.keyboard('{Control>}k{/Control}');
    await user.type(await screen.findByRole('combobox'), 'tema escuro');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Alternar tema claro/escuro');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Enter}');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('navega pelas opções com as setas', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.keyboard('{Control>}k{/Control}');
    const input = await screen.findByRole('combobox');
    const first = screen.getAllByRole('option')[0];
    expect(input).toHaveAttribute('aria-activedescendant', first.id);

    await user.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', screen.getAllByRole('option')[1].id);

    // Seta para cima a partir da primeira opção vai para a última
    await user.keyboard('{ArrowUp}{ArrowUp}');
    const options = screen.getAllByRole('option');
    expect(input).toHaveAttribute('aria-activedescendant', options[options.length - 1].id);
  });

  it('mostra uma mensagem quando nada combina', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.keyboard('{Control>}k{/Control}');
    await user.type(await screen.findByRole('combobox'), 'xyzw');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByText('Nada encontrado para “xyzw”')).toBeInTheDocument();
  });
});
