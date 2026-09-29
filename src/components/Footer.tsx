import { useI18n } from '../i18n/I18nProvider';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {t.footer.text}</p>
    </footer>
  );
}
