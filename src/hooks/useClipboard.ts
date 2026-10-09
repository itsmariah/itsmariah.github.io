import { useCallback } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { useToast } from '../components/Toast';

/** Copia um texto para a área de transferência e avisa com um toast. Resolve `true` se deu certo. */
export function useCopyText() {
  const notify = useToast();

  return useCallback(async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notify(message);
      return true;
    } catch {
      return false;
    }
  }, [notify]);
}

export function useCopyEmail() {
  const { t } = useI18n();
  const copyText = useCopyText();
  return useCallback(() => copyText(profile.email, t.contact.copied), [copyText, t]);
}
