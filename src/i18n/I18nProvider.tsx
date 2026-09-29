import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { pt, type Dictionary } from './pt';
import { en } from './en';

export type Lang = 'pt' | 'en';
/** Texto de conteúdo com versão em cada idioma */
export type Localized = Record<Lang, string>;

const STORAGE_KEY = 'portfolio-lang';
const DICTIONARIES: Record<Lang, Dictionary> = { pt, en };
const HTML_LANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };

function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'pt';
  } catch {
    return 'pt';
  }
}

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  /** Escolhe a versão do idioma atual de um texto de conteúdo */
  l: (text: string | Localized) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage bloqueado */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.title = DICTIONARIES[lang].meta.title;
  }, [lang]);

  const value = useMemo<I18nValue>(() => ({
    lang,
    setLang,
    t: DICTIONARIES[lang],
    l: (text) => (typeof text === 'string' ? text : text[lang]),
  }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n precisa estar dentro de <I18nProvider>');
  return ctx;
}

/** Substitui {chave} pelos valores informados */
export function format(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
