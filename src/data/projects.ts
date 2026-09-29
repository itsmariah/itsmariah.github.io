import { Bird, CakeSlice, CalendarDays, Rocket, Scissors, Wallet, type LucideIcon } from 'lucide-react';
import type { Localized } from '../i18n/I18nProvider';

export interface ProjectImage {
  src: string;
  caption: Localized;
}

export interface Project {
  id: string;
  name: string;
  status: 'published' | 'in-progress';
  /** Aparece no topo, em layout grande. Precisa de imagens para ficar bom. */
  featured?: boolean;
  /** Projeto feito em grupo (ex.: trabalho da faculdade) */
  team?: boolean;
  description: Localized;
  /** O que foi construído — aparece no destaque e no modal */
  highlights: Localized[];
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  /** Cor da capa e ícone usados quando não há imagem */
  accent: string;
  icon: LucideIcon;
  /** 'browser' para sites (16:9); 'app' para telas verticais (jogo) */
  frame: 'browser' | 'app';
  images: ProjectImage[];
}

const img = (project: string, file: string, pt: string, en: string): ProjectImage => ({
  src: `/assets/images/projects/${project}/${file}`,
  caption: { pt, en },
});

// A ordem deste array é a ordem de exibição (destaques primeiro, depois os demais)
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
    highlights: [
      { pt: 'Desafios interativos com feedback automatizado por IA', en: 'Interactive challenges with AI-powered automated feedback' },
      { pt: 'Gamificação e dashboard de progresso do usuário', en: 'Gamification and a user progress dashboard' },
      { pt: 'Área administrativa', en: 'Admin area' },
      { pt: 'Back-end em Node.js integrado ao front-end', en: 'Node.js back-end integrated with the front-end' },
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    liveUrl: 'https://skillupdev.onrender.com',
    repoUrl: 'https://github.com/itsmariah/skillupdev',
    accent: '#6d5ae6',
    icon: Rocket,
    frame: 'browser',
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
    featured: true,
    description: {
      pt: 'Aplicação desenvolvida para organizar e visualizar informações financeiras com foco em usabilidade e clareza visual.',
      en: 'An application built to organize and visualize financial information with a focus on usability and visual clarity.',
    },
    highlights: [
      { pt: 'Dashboard para visualizar as finanças', en: 'Dashboard to visualize finances' },
      { pt: 'Relatórios financeiros', en: 'Financial reports' },
      { pt: 'Interface em React com foco em usabilidade', en: 'React interface focused on usability' },
    ],
    tags: ['JavaScript', 'CSS', 'React'],
    liveUrl: 'https://moneytrack-m4dd.vercel.app',
    repoUrl: 'https://github.com/itsmariah/moneytrack',
    accent: '#1a77c4',
    icon: Wallet,
    frame: 'browser',
    images: [
      img('moneytrack', 'moneytrack_landing.webp', 'Landing', 'Landing'),
      img('moneytrack', 'moneytrack_dashboard.webp', 'Dashboard', 'Dashboard'),
      img('moneytrack', 'moneytrack_relatorio.webp', 'Relatório', 'Report'),
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
    highlights: [
      { pt: 'Cardápio e pedidos online para uma cliente real', en: 'Menu and online ordering for a real client' },
      { pt: 'Pagamento por Pix e cartão via Mercado Pago', en: 'Pix and credit card payments via Mercado Pago' },
      { pt: 'Painel administrativo com níveis de acesso', en: 'Admin dashboard with role-based access' },
    ],
    tags: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'PostgreSQL'],
    repoUrl: 'https://github.com/itsmariah/mistydoces',
    accent: '#8e6fb3',
    icon: CakeSlice,
    frame: 'browser',
    images: [],
  },
  {
    id: 'barbearia',
    name: 'Barbearia Clássica',
    status: 'published',
    team: true,
    description: {
      pt: 'Site institucional para uma barbearia fictícia com página de serviços, galeria e formulário de agendamento online.',
      en: 'An institutional site for a fictional barbershop with a services page, gallery, and online booking form.',
    },
    highlights: [
      { pt: 'Página de serviços e galeria', en: 'Services page and gallery' },
      { pt: 'Formulário de agendamento online', en: 'Online booking form' },
    ],
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://anitandonato.github.io/projeto-aplicacoes-para-internet',
    repoUrl: 'https://github.com/anitandonato/projeto-aplicacoes-para-internet',
    accent: '#7a5230',
    icon: Scissors,
    frame: 'browser',
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
    highlights: [
      { pt: 'Jogo completo com menu, configurações, pausa e ranking', en: 'Complete game with menu, settings, pause, and leaderboard' },
      { pt: 'Construído do zero para estudar arquitetura de software em jogos', en: 'Built from scratch to study software architecture in games' },
    ],
    tags: ['Python', 'Pygame'],
    repoUrl: 'https://github.com/itsmariah/flappypy',
    accent: '#3a8fd9',
    icon: Bird,
    frame: 'app',
    images: [
      img('flappypy', 'menu.png', 'Menu', 'Menu'),
      img('flappypy', 'game.png', 'Jogo', 'Gameplay'),
      img('flappypy', 'game3.png', 'Jogo 3', 'Gameplay 3'),
      img('flappypy', 'config.png', 'Configurações', 'Settings'),
      img('flappypy', 'ranking.png', 'Ranking', 'Leaderboard'),
    ],
  },
  {
    id: 'agenda',
    name: 'Agenda.AI',
    status: 'in-progress',
    description: {
      pt: 'Sistema web para cadastro de usuários e gerenciamento de agendamentos, simulando aplicações reais de serviços.',
      en: 'A web system for user registration and appointment management, simulating real-world service applications.',
    },
    highlights: [
      { pt: 'Cadastro de usuários', en: 'User registration' },
      { pt: 'Gerenciamento de agendamentos', en: 'Appointment management' },
    ],
    tags: ['TypeScript', 'JavaScript', 'CSS', 'React'],
    repoUrl: 'https://github.com/itsmariah/agenda.ai',
    accent: '#22863a',
    icon: CalendarDays,
    frame: 'browser',
    images: [],
  },
];
