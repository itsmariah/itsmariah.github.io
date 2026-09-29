import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { I18nProvider } from './i18n/I18nProvider';
import { App } from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user": respeita o "reduzir movimento" do sistema */}
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <App />
      </I18nProvider>
    </MotionConfig>
  </StrictMode>,
);
