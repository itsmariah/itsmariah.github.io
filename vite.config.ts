import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// O repositório é itsmariah.github.io, servido na raiz do domínio
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      // 404.html: o GitHub Pages serve essa página para qualquer caminho inexistente
      input: { main: 'index.html', notFound: '404.html' },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
