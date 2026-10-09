import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { reveal } from '../hooks/reveal';
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
      className={`icon-btn copy-btn${copied ? ' copied' : ''}`}
      title={copied ? t.contact.copied : t.contact.copyEmail}
      aria-label={copied ? t.contact.copied : t.contact.copyEmail}
      onClick={() => navigator.clipboard.writeText(profile.email).then(() => setCopied(true), () => {})}
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
    </button>
  );
}

interface ChannelProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  action?: ReactNode;
}

function Channel({ icon, label, value, href, external = true, action }: ChannelProps) {
  return (
    <li className="channel spotlight">
      <a
        href={href}
        className="channel-link"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="channel-icon" aria-hidden="true">{icon}</span>
        <span className="channel-text">
          <span className="channel-label">{label}</span>
          <span className="channel-value">{value}</span>
        </span>
        {!action && <ArrowUpRight className="channel-arrow" size={16} aria-hidden="true" />}
      </a>
      {action}
    </li>
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
    <div className="contact-form-wrap spotlight reveal" ref={reveal}>
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

        {/* Armadilha antispam do Formspree: invisível para pessoas, bots preenchem e a mensagem é descartada */}
        <input type="text" name="_gotcha" className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
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
      <div className="contact-grid">
        <div className="contact-info reveal" ref={reveal}>
          <h2 className="section-title">
            <span className="section-num" aria-hidden="true">05</span>
            {t.contact.title}
          </h2>
          <p className="section-intro">{t.contact.intro}</p>

          <h3 className="tier-title contact-subtitle">{t.contact.channels}</h3>
          <ul className="channels stagger">
            <Channel
              icon={<Mail size={20} />}
              label="E-mail"
              value={profile.email}
              href={`mailto:${profile.email}`}
              external={false}
              action={<CopyEmailButton />}
            />
            <Channel icon={<LinkedInIcon size={20} />} label="LinkedIn" value="Maria Mariah" href={profile.links.linkedin} />
            <Channel icon={<GitHubIcon size={20} />} label="GitHub" value="@itsmariah" href={profile.links.github} />
            <Channel icon={<WhatsAppIcon size={20} />} label="WhatsApp" value={t.contact.whatsapp} href={profile.links.whatsapp} />
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
