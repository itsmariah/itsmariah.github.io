import type { Localized } from '../i18n/I18nProvider';

export interface ProjectImage {
  src: string;
  caption: Localized;
}

export interface Project {
  id: string;
  name: string;
  status: 'published' | 'in-progress';
  featured?: boolean;
  description: Localized;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  /** Emoji e classe de gradiente usados como capa quando não há imagem (ou antes do hover) */
  placeholder: { emoji: string; className: string };
  images: ProjectImage[];
}

const img = (project: string, file: string, pt: string, en: string): ProjectImage => ({
  src: `/assets/images/projects/${project}/${file}`,
  caption: { pt, en },
});

// A ordem deste array é a ordem de exibição: destaque, publicados, em desenvolvimento
export const projects: Project[] = [
  {
    id: 'skillupdev',
    name: 'SkillUp Dev',
    status: 'published',
    featured: true,
    description: {
      pt: 'Plataforma web gamificada voltada ao aprimoramento de soft skills para desenvolvedores, com desafios interativos e feedback automatizado com apoio de IA.',
      en: 'A gamified web platform focused on developing soft skills for developers, with interactive challenges and AI-powered automated feedback.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    liveUrl: 'https://skillupdev.onrender.com',
    repoUrl: 'https://github.com/itsmariah/skillupdev',
    placeholder: { emoji: '🚀', className: 'thumbnail-skillup' },
    images: [
      img('skillupdev', 'skillupdev_lading1.webp', 'Landing', 'Landing'),
      img('skillupdev', 'skillupdev_funcionalidades.webp', 'Funcionalidades', 'Features'),
      img('skillupdev', 'skillupdev_dashboard1.webp', 'Dashboard', 'Dashboard'),
      img('skillupdev', 'skillupdev_desafio_aberto1.webp', 'Desafio aberto', 'Open challenge'),
      img('skillupdev', 'skillupdev_adm1.webp', 'Administração', 'Admin'),
    ],
  },
  {
    id: 'moneytrack',
    name: 'MoneyTrack',
    status: 'published',
    description: {
      pt: 'Aplicação desenvolvida para organizar e visualizar informações financeiras com foco em usabilidade e clareza visual.',
      en: 'An application built to organize and visualize financial information with a focus on usability and visual clarity.',
    },
    tags: ['JavaScript', 'CSS', 'React'],
    liveUrl: 'https://moneytrack-m4dd.vercel.app',
    repoUrl: 'https://github.com/itsmariah/moneytrack',
    placeholder: { emoji: '💰', className: 'thumbnail-dashboard' },
    images: [
      img('moneytrack', 'moneytrack_landing.webp', 'Landing', 'Landing'),
      img('moneytrack', 'moneytrack_dashboard.webp', 'Dashboard', 'Dashboard'),
      img('moneytrack', 'moneytrack_relatorio.webp', 'Relatório', 'Report'),
    ],
  },
  {
    id: 'barbearia',
    name: 'Barbearia Clássica',
    status: 'published',
    description: {
      pt: 'Site institucional para uma barbearia fictícia com página de serviços, galeria e formulário de agendamento online.',
      en: 'An institutional site for a fictional barbershop with a services page, gallery, and online booking form.',
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://anitandonato.github.io/projeto-aplicacoes-para-internet',
    repoUrl: 'https://github.com/anitandonato/projeto-aplicacoes-para-internet',
    placeholder: { emoji: '✂️', className: 'thumbnail-barbearia' },
    images: [
      img('barbearia', 'barbearia_landing.webp', 'Landing', 'Landing'),
      img('barbearia', 'barbearia_landing2.webp', 'Seção 2', 'Section 2'),
      img('barbearia', 'barbearia_agendamento.webp', 'Agendamento', 'Booking'),
    ],
  },
  {
    id: 'flappypy',
    name: 'FlappyPy',
    status: 'published',
    description: {
      pt: 'Um clone do clássico Flappy Bird feito em Python com Pygame, construído do zero como projeto de estudo de arquitetura de software aplicada a jogos.',
      en: 'A clone of the classic Flappy Bird built in Python with Pygame, built from scratch as a study project in software architecture applied to games.',
    },
    tags: ['Python', 'Pygame'],
    repoUrl: 'https://github.com/itsmariah/flappypy',
    placeholder: { emoji: '🐦', className: 'thumbnail-flappypy' },
    images: [
      img('flappypy', 'menu.png', 'Menu', 'Menu'),
      img('flappypy', 'game.png', 'Jogo', 'Gameplay'),
      img('flappypy', 'game3.png', 'Jogo 3', 'Gameplay 3'),
      img('flappypy', 'config.png', 'Configurações', 'Settings'),
      img('flappypy', 'ranking.png', 'Ranking', 'Leaderboard'),
    ],
  },
  {
    id: 'mistydoces',
    name: 'MistyDoces',
    status: 'in-progress',
    description: {
      pt: 'Sistema web completo para uma confeitaria artesanal real: cardápio, pedidos online, pagamento por Pix e cartão via Mercado Pago e painel administrativo com níveis de acesso.',
      en: 'A full web system for a real artisan bakery: menu, online ordering, Pix and credit card payments via Mercado Pago, and an admin dashboard with role-based access.',
    },
    tags: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'PostgreSQL'],
    repoUrl: 'https://github.com/itsmariah/mistydoces',
    placeholder: { emoji: '🧁', className: 'thumbnail-mistydoces' },
    images: [],
  },
  {
    id: 'agenda',
    name: 'Agenda.AI',
    status: 'in-progress',
    description: {
      pt: 'Sistema web para cadastro de usuários e gerenciamento de agendamentos, simulando aplicações reais de serviços.',
      en: 'A web system for user registration and appointment management, simulating real-world service applications.',
    },
    tags: ['TypeScript', 'JavaScript', 'CSS', 'React'],
    repoUrl: 'https://github.com/itsmariah/agenda.ai',
    placeholder: { emoji: '📅', className: 'thumbnail-agenda' },
    images: [],
  },
];
