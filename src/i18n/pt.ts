// Textos fixos da interface. Conteúdo (projetos, certificados, currículo) fica em src/data.
export const pt = {
  meta: { title: 'Maria Mariah | Desenvolvedora Front-End' },
  nav: {
    about: 'Sobre',
    skills: 'Tecnologias',
    projects: 'Projetos',
    certificates: 'Certificados',
    resume: 'Currículo',
    contact: 'Contato',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    themeToggle: 'Alternar tema',
    language: 'Idioma',
  },
  hero: {
    tag: 'Disponível para vagas Front-End Júnior',
    role: 'Desenvolvedora Front-End',
    description:
      'Bacharel em Ciência da Computação com foco em desenvolvimento web, apaixonada por transformar ideias em experiências digitais funcionais e intuitivas.',
    viewProjects: 'Ver projetos',
    downloadCv: 'Baixar CV',
    location: 'João Pessoa, PB',
    social: 'Redes e contato',
  },
  about: {
    title: 'Sobre mim',
    p1: 'Sou bacharel em Ciência da Computação e tenho direcionado minha trajetória para a área de desenvolvimento front-end e web. Gosto de construir interfaces organizadas, bonitas e funcionais, com atenção especial à experiência do usuário.',
    p2: 'Atualmente, venho desenvolvendo projetos práticos que fortalecem minhas habilidades com HTML, CSS, JavaScript e integração entre front-end e back-end, com destaque para o SkillUp Dev, plataforma voltada ao desenvolvimento de soft skills para desenvolvedores.',
    facts: {
      education: 'Formação',
      educationValue: 'Bacharel em Ciência da Computação — UNIPÊ',
      location: 'Localização',
      focus: 'Foco',
      focusValue: 'Front-end e integração com back-end',
      now: 'Atualmente',
      nowValue: 'Desenvolvendo o MistyDoces, sistema para uma confeitaria real',
    },
  },
  skills: {
    title: 'Tecnologias',
    intro: 'Clique em uma tecnologia para ver os projetos em que ela aparece.',
    tiers: { daily: 'Uso no dia a dia', familiar: 'Já trabalhei com', practices: 'Práticas' },
    projectCount: { one: '1 projeto', other: '{count} projetos' },
    showProjects: 'Ver projetos com {name}',
  },
  projects: {
    title: 'Projetos',
    filterAll: 'Todos',
    filterLabel: 'Filtrar projetos por tecnologia',
    viewLive: 'Ver ao vivo →',
  },
  status: { published: 'Publicado', inProgress: 'Em desenvolvimento', featured: 'Destaque' },
  slideshow: {
    prev: 'Anterior',
    next: 'Próximo',
    goTo: 'Ir para imagem {n} de {total}',
    open: 'Ampliar imagem',
  },
  certs: {
    title: 'Certificados',
    intro: 'Cursos e certificações que fazem parte da minha formação contínua.',
    viewCert: 'Ver certificado',
  },
  resume: {
    title: 'Currículo',
    tabs: { education: 'Educação', experience: 'Experiências', soft: 'Soft Skills' },
  },
  contact: {
    title: 'Contato',
    intro:
      'Estou disponível para vagas de Desenvolvedora Front-End Júnior e aberta a networking e conexões na área de tecnologia.',
    copyEmail: 'Copiar e-mail',
    copied: 'E-mail copiado',
    formTitle: 'Envie uma mensagem',
    form: {
      name: 'Nome',
      email: 'E-mail',
      subject: 'Assunto',
      message: 'Mensagem',
      namePlaceholder: 'Seu nome',
      emailPlaceholder: 'seu@email.com',
      subjectPlaceholder: 'Sobre o que é?',
      messagePlaceholder: 'Escreva sua mensagem aqui...',
      submit: 'Enviar mensagem',
      submitting: 'Enviando...',
    },
    success: 'Mensagem enviada com sucesso! Responderei em breve.',
    error: 'Ops! Não foi possível enviar. Tente me contatar diretamente pelo e-mail.',
  },
  footer: { text: 'Maria Mariah Queiroga Fernandes Soares — Portfólio Front-End' },
  a11y: {
    backToTop: 'Voltar ao topo',
    lightboxClose: 'Fechar',
    lightboxDialog: 'Visualizar imagem em tela cheia',
  },
};

export type Dictionary = typeof pt;
