import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { I18nProvider } from './i18n/I18nProvider';
import type { Dictionary } from './i18n/pt';
import { NotFound } from './components/NotFound';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/space-grotesk/wght.css';
import './styles/global.css';

// Entrada da página 404.html (ver vite.config.ts)
const pageTitle = (t: Dictionary) => `${t.notFound.title} | Maria Mariah`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <I18nProvider pageTitle={pageTitle}>
        <NotFound />
      </I18nProvider>
    </MotionConfig>
  </StrictMode>,
);
