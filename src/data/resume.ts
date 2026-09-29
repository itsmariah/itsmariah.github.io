import type { Localized } from '../i18n/I18nProvider';

export interface TimelineItem {
  id: string;
  period: Localized;
  title: Localized;
  description: Localized;
}

export const education: TimelineItem[] = [
  {
    id: 'unipe',
    period: { pt: '2022 – 2026', en: '2022 – 2026' },
    title: { pt: 'Bacharelado em Ciência da Computação', en: "Bachelor's in Computer Science" },
    description: { pt: 'UNIPÊ Centro Universitário · João Pessoa, PB', en: 'UNIPÊ Centro Universitário · João Pessoa, PB' },
  },
];

export const experience: TimelineItem[] = [
  {
    id: 'teeva',
    period: { pt: '2023 – 2023', en: '2023 – 2023' },
    title: { pt: 'Assistente Administrativo', en: 'Administrative Assistant' },
    description: {
      pt: 'Teeva · Efetivo em venda de produtos online, suporte ao cliente, emissão de documentos e administração de controle de estoque.',
      en: 'Teeva · Handled online product sales, customer support, document issuance, and inventory control management.',
    },
  },
  {
    id: 'centauro',
    period: { pt: 'Nov 2022 – Fev 2023', en: 'Nov 2022 – Feb 2023' },
    title: { pt: 'Assistente de Loja', en: 'Store Assistant' },
    description: {
      pt: 'Centauro · Atendimento ao cliente com foco na experiência de compra, organização da loja e suporte nas operações de caixa.',
      en: 'Centauro · Customer service focused on the shopping experience, store organization, and checkout support.',
    },
  },
  {
    id: 'aec',
    period: { pt: 'Jul 2021 – Jun 2022', en: 'Jul 2021 – Jun 2022' },
    title: { pt: 'Operadora de Call Center', en: 'Call Center Operator' },
    description: {
      pt: 'AeC · Atendimento ao cliente em ambiente de alta demanda, com foco em comunicação clara, resolução de problemas e cumprimento de metas.',
      en: 'AeC · High-demand customer service focused on clear communication, problem-solving, and meeting performance targets.',
    },
  },
];

export const softSkills: Localized[] = [
  { pt: '🤝 Trabalho em equipe', en: '🤝 Teamwork' },
  { pt: '🧩 Resolução de problemas', en: '🧩 Problem solving' },
  { pt: '🗣️ Comunicação', en: '🗣️ Communication' },
  { pt: '⏱️ Gestão de tempo', en: '⏱️ Time management' },
  { pt: '📚 Aprendizado contínuo', en: '📚 Continuous learning' },
  { pt: '🎯 Atenção aos detalhes', en: '🎯 Attention to detail' },
  { pt: '💡 Criatividade', en: '💡 Creativity' },
  { pt: '🔄 Adaptabilidade', en: '🔄 Adaptability' },
];
