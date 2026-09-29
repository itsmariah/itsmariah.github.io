import type { Localized } from '../i18n/I18nProvider';

export interface Certificate {
  id: string;
  icon: string;
  platform: string;
  name: Localized;
  date: Localized;
  file: string;
}

const CERT_DIR = '/assets/certificados/';

export const certificates: Certificate[] = [
  {
    id: 'unipe',
    icon: '🏫',
    platform: 'UNIPÊ',
    name: { pt: 'Escola de Computação Solidária — Extensionista', en: 'Community Computing School — Extension Program' },
    date: { pt: 'Mar – Jun 2026', en: 'Mar – Jun 2026' },
    file: CERT_DIR + 'Certificado Escola de Computação Solidária - Extensionista 2026.PDF',
  },
  {
    id: 'claude',
    icon: '🤖',
    platform: 'Udemy',
    name: { pt: 'Formação Claude Code 2026 — IA com Claude e Cowork', en: 'Claude Code 2026 Training — AI with Claude and Cowork' },
    date: { pt: 'Jun 2026', en: 'Jun 2026' },
    file: CERT_DIR + 'Certificado Formação Claude Code 2026 (IA com Claude e Cowork).pdf',
  },
  {
    id: 'algoritmos',
    icon: '💻',
    platform: 'Udemy',
    name: { pt: 'Algoritmos e Lógica de Programação', en: 'Algorithms and Programming Logic' },
    date: { pt: 'Abr 2026', en: 'Apr 2026' },
    file: CERT_DIR + 'Certificado Algoritmos e Lógica de Programação.pdf',
  },
  {
    id: 'pucrs',
    icon: '🔒',
    platform: 'PUCRS',
    name: { pt: 'Compliance e Proteção de Dados', en: 'Compliance and Data Protection' },
    date: { pt: 'Jun 2026', en: 'Jun 2026' },
    file: CERT_DIR + 'Certificado Curso de Extensão Compliance e Proteção de Dados.pdf',
  },
  {
    id: 'web',
    icon: '🖥️',
    platform: 'Alura',
    name: { pt: 'Imersão Arquitetura Web com IA', en: 'Web Architecture with AI Immersion' },
    date: { pt: 'Jul 2026', en: 'Jul 2026' },
    file: CERT_DIR + 'Certificado Imersão Arquitetura Web com IA (Alura).pdf',
  },
];
