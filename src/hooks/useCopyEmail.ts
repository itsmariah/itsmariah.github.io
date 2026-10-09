import { useCallback } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { useToast } from '../components/Toast';

/** Copia o e-mail para a área de transferência e avisa com um toast. Resolve `true` se deu certo. */
export function useCopyEmail() {
  const { t } = useI18n();
  const notify = useToast();

  return useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify(t.contact.copied);
      return true;
    } catch {
      return false;
    }
  }, [notify, t]);
}
