import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O repositório é itsmariah.github.io, servido na raiz do domínio
export default defineConfig({
  plugins: [react()],
  base: '/',
});
