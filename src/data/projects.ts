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
  /** Como o projeto começou/evoluiu — aparece no destaque e no modal */
  origin?: Localized;
  /** Do problema ao resultado — aparece no modal. Só fatos reais, sem números inventados. */
  story?: { problem: Localized; solution: Localized; result: Localized };
  /** Selos extras, como "em breve" ou "app em desenvolvimento" */
  notes?: Localized[];
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
    origin: {
      pt: 'Nasceu como meu Trabalho de Conclusão de Curso em Ciência da Computação, com uma pesquisa extensa e bem estruturada sobre o gap de soft skills na área de TI.',
      en: 'It started as my Computer Science capstone project, backed by extensive, well-structured research on the soft skills gap in tech.',
    },
    story: {
      problem: {
        pt: 'Boa parte dos profissionais de TI concentra os estudos nas habilidades técnicas e deixa de lado as comportamentais, como comunicação e trabalho em equipe, que pesam tanto quanto na carreira e na vida pessoal.',
        en: 'Many tech professionals focus their learning on technical skills and leave behavioral ones, like communication and teamwork, aside, even though they matter just as much for their careers and personal lives.',
      },
      solution: {
        pt: 'Desafios práticos e gamificados, organizados por categoria (comunicação, trabalho em equipe, empatia e outras), com um agente de IA que avalia as respostas dos desafios abertos.',
        en: 'Hands-on, gamified challenges organized by category (communication, teamwork, empathy, and more), with an AI agent that evaluates answers to open-ended challenges.',
      },
      result: {
        pt: 'Quem testou elogiou a proposta, o sistema de gamificação, a estrutura dos desafios e a avaliação das respostas por IA.',
        en: 'Users praised the concept, the gamification system, the structure of the challenges, and the AI evaluation of their answers.',
      },
    },
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
    id: 'geldtrack',
    name: 'GeldTrack',
    status: 'published',
    featured: true,
    origin: {
      pt: 'Começou como MoneyTrack, um projeto em grupo na disciplina de Programação de Computadores. Decidi dar continuidade sozinha e hoje desenvolvo e mantenho o GeldTrack como produto.',
      en: 'It started as MoneyTrack, a group project in a Computer Programming course. I chose to keep building it on my own, and today I develop and maintain GeldTrack as a product.',
    },
    notes: [{ pt: 'App mobile em desenvolvimento', en: 'Mobile app in progress' }],
    story: {
      problem: {
        pt: 'Quem quer organizar as finanças, sozinho, em família ou em grupo, costuma precisar de vários apps para acompanhar receitas e despesas, conectar contas e criar metas, orçamentos e recorrências.',
        en: 'People trying to get their finances in order, alone, as a family, or in a group, usually need several apps to track income and expenses, connect accounts, and set up goals, budgets, and recurring items.',
      },
      solution: {
        pt: 'Tudo isso num app só, sincronizado entre a versão web, o app instalável para Windows, macOS e Linux e, em breve, o app mobile para Android e iOS.',
        en: 'All of it in a single app, synced across the web version, an installable app for Windows, macOS, and Linux, and soon a mobile app for Android and iOS.',
      },
      result: {
        pt: 'Ainda não foi divulgado amplamente, mas os primeiros usuários elogiam o layout moderno e a variedade de funcionalidades.',
        en: "It hasn't been widely promoted yet, but early users praise its modern layout and wide range of features.",
      },
    },
    description: {
      pt: 'Plataforma de gestão financeira pessoal e compartilhada: contas em várias moedas, sincronização bancária via Open Finance, insights automáticos, relatórios, metas, orçamentos e divisão de despesas em grupo. Funciona na web, como PWA e como app desktop.',
      en: 'A personal and shared finance platform: multi-currency accounts, bank sync via Open Finance, automatic insights, reports, goals, budgets, and group expense splitting. Runs on the web, as a PWA, and as a desktop app.',
    },
    highlights: [
      { pt: 'Sincronização bancária via Open Finance (Pluggy), importação OFX e exportação CSV', en: 'Bank sync via Open Finance (Pluggy), OFX import, and CSV export' },
      { pt: 'Dashboard com saldo previsto e insights automáticos sobre gastos e metas', en: 'Dashboard with projected balance and automatic insights on spending and goals' },
      { pt: 'Metas, orçamentos por categoria com alerta por e-mail, eventos e transações recorrentes', en: 'Goals, per-category budgets with email alerts, events, and recurring transactions' },
      { pt: 'Carteira da família e grupos estilo Splitwise para dividir despesas', en: 'Shared family wallet and Splitwise-style groups to split expenses' },
      { pt: 'Contas em várias moedas com cotações e relatórios em PDF com retrospectiva', en: 'Multi-currency accounts with exchange rates, and PDF reports with a monthly recap' },
      { pt: 'API em Node.js/Express com PostgreSQL, Prisma, JWT e testes de integração', en: 'Node.js/Express API with PostgreSQL, Prisma, JWT, and integration tests' },
    ],
    tags: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Electron', 'Vitest'],
    liveUrl: 'https://geldtrack.vercel.app',
    repoUrl: 'https://github.com/itsmariah/geldtrack',
    accent: '#6366f1',
    icon: Wallet,
    frame: 'browser',
    images: [
      img('geldtrack', 'geldtrack_landing.webp', 'Landing', 'Landing'),
      img('geldtrack', 'geldtrack_dashboard.webp', 'Dashboard', 'Dashboard'),
      img('geldtrack', 'geldtrack_contas.webp', 'Contas', 'Accounts'),
      img('geldtrack', 'geldtrack_relatorios.webp', 'Relatórios', 'Reports'),
      img('geldtrack', 'geldtrack_metas.webp', 'Metas', 'Goals'),
      img('geldtrack', 'geldtrack_orcamentos.webp', 'Orçamentos', 'Budgets'),
      img('geldtrack', 'geldtrack_eventos.webp', 'Eventos', 'Events'),
      img('geldtrack', 'geldtrack_categorias.webp', 'Categorias', 'Categories'),
    ],
  },
  {
    id: 'mistydoces',
    name: 'MistyDoces',
    status: 'in-progress',
    notes: [{ pt: 'Lançamento em breve', en: 'Launching soon' }],
    story: {
      problem: {
        pt: 'Uma loja de doces artesanais precisava de uma plataforma própria para receber e acompanhar seus pedidos.',
        en: 'An artisan sweets shop needed its own platform to take and track orders.',
      },
      solution: {
        pt: 'Para os clientes, um site com cardápio, horários e contato. Para a equipe, um painel com níveis de acesso para acompanhar pedidos, avaliações e faturamento, gerenciar cupons e frete, e um módulo financeiro para registrar despesas e compará-las com o faturamento.',
        en: 'For customers, a site with the menu, opening hours, and contact info. For the team, a dashboard with access levels to track orders, reviews, and revenue, manage coupons and shipping, plus a finance module to log expenses and compare them with revenue.',
      },
      result: {
        pt: 'Aprovado pelos proprietários. O lançamento aguarda o registro do domínio e outros trâmites legais.',
        en: 'Approved by the owners. Launch is pending domain registration and other legal steps.',
      },
    },
    description: {
      pt: 'Sistema web completo para uma confeitaria artesanal real: cardápio, pedidos online, pagamento por Pix e cartão via Mercado Pago e painel administrativo com níveis de acesso.',
      en: 'A full web system for a real artisan bakery: menu, online ordering, Pix and credit card payments via Mercado Pago, and an admin dashboard with role-based access.',
    },
    highlights: [
      { pt: 'Cardápio e pedidos online para uma loja real', en: 'Menu and online ordering for a real shop' },
      { pt: 'Pagamento por Pix e cartão via Mercado Pago', en: 'Pix and credit card payments via Mercado Pago' },
      { pt: 'Painel com níveis de acesso para atendente, gerente e proprietários', en: 'Dashboard with access levels for staff, managers, and owners' },
      { pt: 'Gestão de pedidos, avaliações, cupons de desconto e frete', en: 'Management of orders, reviews, discount coupons, and shipping' },
      { pt: 'Painel financeiro com despesas comparadas ao faturamento', en: 'Finance dashboard comparing expenses with revenue' },
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
