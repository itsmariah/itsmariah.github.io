import type { CSSProperties } from 'react';
import { ArrowLeft, FolderOpen, Mail } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Backdrop } from './Backdrop';

/** Página 404 (404.html): o GitHub Pages a serve para qualquer caminho que não existe. */
export function NotFound() {
  const { t } = useI18n();
  const n = t.notFound;

  return (
    <>
      <Backdrop />
      <main className="not-found">
        <a href="/" className="logo">itsmariah<span aria-hidden="true">.</span></a>

        {/* Cada dígito entra (.hero-letter), flutua num ritmo próprio e tem o gradiente animado:
            uma animação por camada, porque elas não se combinam no mesmo elemento */}
        <p className="not-found-code" aria-hidden="true">
          {['4', '0', '4'].map((digit, i) => (
            <span className="hero-letter" key={i} style={{ '--ci': i } as CSSProperties}>
              <span className="not-found-digit"><span className="text-gradient">{digit}</span></span>
            </span>
          ))}
        </p>

        <h1 className="not-found-title">{n.title}</h1>
        <p className="not-found-text">{n.text}</p>

        <div className="not-found-actions">
          <a href="/" className="btn btn-primary">
            <ArrowLeft size={18} aria-hidden="true" />
            {n.home}
          </a>
          <a href="/#projetos" className="btn btn-secondary">
            <FolderOpen size={18} aria-hidden="true" />
            {n.projects}
          </a>
          <a href="/#contato" className="btn btn-secondary">
            <Mail size={18} aria-hidden="true" />
            {n.contact}
          </a>
        </div>
      </main>
    </>
  );
}
