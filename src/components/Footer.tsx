import { useI18n } from '../i18n/I18nProvider';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {t.footer.text}</p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  );
}
