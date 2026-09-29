import { useEffect, useState, type FormEvent } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { reveal } from '../hooks/reveal';
import { Check, Copy, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './Icons';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

function CopyEmailButton() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className={`copy-btn${copied ? ' copied' : ''}`}
      title={copied ? t.contact.copied : t.contact.copyEmail}
      aria-label={copied ? t.contact.copied : t.contact.copyEmail}
      onClick={() => navigator.clipboard.writeText(profile.email).then(() => setCopied(true), () => {})}
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
    </button>
  );
}

function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(profile.formspreeUrl, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('server');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const f = t.contact.form;

  return (
    <div className="contact-form-wrap reveal" ref={reveal}>
      <h3 className="contact-form-title">{t.contact.formTitle}</h3>
      {/* E-mails recebidos via https://formspree.io */}
      <form className="contact-form" action={profile.formspreeUrl} method="POST" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="formName">{f.name}</label>
            <input type="text" id="formName" name="name" placeholder={f.namePlaceholder} autoComplete="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="formEmail">{f.email}</label>
            <input type="email" id="formEmail" name="email" placeholder={f.emailPlaceholder} autoComplete="email" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formSubject">{f.subject}</label>
          <input type="text" id="formSubject" name="subject" placeholder={f.subjectPlaceholder} required />
        </div>
        <div className="form-group">
          <label htmlFor="formMessage">{f.message}</label>
          <textarea id="formMessage" name="message" rows={5} placeholder={f.messagePlaceholder} required></textarea>
        </div>
        <button type="submit" className="btn primary form-submit" disabled={status === 'sending'}>
          {status === 'sending' ? f.submitting : f.submit}
        </button>
        <p className={`form-feedback ${status}`} role="status" hidden={status !== 'success' && status !== 'error'}>
          {status === 'success' && t.contact.success}
          {status === 'error' && t.contact.error}
        </p>
      </form>
    </div>
  );
}

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contato" className="section container">
      <h2 className="section-title reveal" ref={reveal}>{t.contact.title}</h2>
      <p className="section-text reveal" ref={reveal}>{t.contact.intro}</p>

      <div className="contact-links">
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card reveal" ref={reveal}>
          <LinkedInIcon size={20} />
          LinkedIn
        </a>
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="contact-card reveal" ref={reveal}>
          <GitHubIcon size={20} />
          GitHub
        </a>
        <div className="contact-card email-card reveal" ref={reveal}>
          <Mail size={20} aria-hidden="true" />
          <span>{profile.email}</span>
          <CopyEmailButton />
        </div>
        <a href={profile.links.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-card whatsapp-card reveal" ref={reveal}>
          <WhatsAppIcon size={20} />
          WhatsApp
        </a>
      </div>

      <ContactForm />
    </section>
  );
}
