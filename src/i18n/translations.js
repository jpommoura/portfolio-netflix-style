export const translations = {
  pt: {
    profile: {
      title: 'Quem está assistindo?',
    },
    nav: {
      about: 'Sobre Mim',
      projects: 'Projetos',
      experiences: 'Experiências',
      github: 'GitHub',
      skills: 'Skills',
      contact: 'Contato',
      backToProfiles: 'Trocar perfil',
    },
    language: {
      label: 'Idioma',
    },
    hero: {
      greeting: 'Olá, eu sou',
      description:
        'Estudante de Engenharia de Software na PUC Minas, cursando o 2º semestre. Apaixonado por desenvolvimento web, futebol, filmes e games. Buscando minha primeira oportunidade como estagiário na área de desenvolvimento.',
      btnText: 'Ver Projetos',
      btnInfo: 'Mais Informações',
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Do mais antigo ao mais recente',
      inProgress: 'Em desenvolvimento',
      items: {
        nextrip: 'Aplicação web dinâmica de viagens com autenticação e CRUD administrativo.',
        vigilare: 'Plataforma de segurança de bairro com denúncias e mapeamento comunitário.',
        arquivoFacil: 'Sistema de gerenciamento de notas fiscais com Supabase.',
        penaltyCrash: 'Jogo de pênaltis com mecânicas de crash.',
        vemDoar: 'Plataforma de mobilização de doadores de sangue.',
      },
    },
    experiences: {
      title: 'Experiências',
      items: [
        {
          title: 'Engenharia de Software',
          place: 'PUC Minas — Contagem',
          description:
            'Graduação em andamento, atualmente no 2º semestre. Foco em desenvolvimento web e engenharia de software.',
        },
        {
          title: 'Projetos Acadêmicos',
          place: 'PUC Minas',
          description:
            'Desenvolvimento de projetos práticos como NexTrip, Vigilare e VemDoar, aplicando HTML, CSS, JavaScript, Bootstrap e JSON Server.',
        },
        {
          title: 'Projetos Pessoais',
          place: 'Freelance / Autodidata',
          description:
            'Criação do Arquivo Fácil (Node.js + Supabase) para gerenciamento de notas fiscais, e exploração de APIs e ferramentas modernas de desenvolvimento.',
        },
      ],
    },
    stats: {
      title: 'Em alta agora',
      subtitle: 'Minha atividade no GitHub, atualizada em tempo real',
      repos: 'Repositórios públicos',
      stars: 'Estrelas',
      topLanguage: 'Linguagem principal',
      lastActivity: 'Última atividade',
      languages: 'Linguagens mais usadas',
      activity: 'Atividade nas últimas 12 semanas',
      less: 'Menos',
      more: 'Mais',
      noActivity: 'Sem atividade',
      events: (n) => `${n} ${n === 1 ? 'evento' : 'eventos'}`,
      reposCount: (n) => `${n} ${n === 1 ? 'repositório' : 'repositórios'}`,
      error: 'Não foi possível carregar os dados do GitHub agora.',
      none: '—',
    },
    github: {
      title: 'GitHub',
      subtitle: 'Repositórios atualizados em tempo real via GitHub API',
      loading: 'Carregando repositórios...',
      noDescription: 'Sem descrição',
    },
    skills: {
      title: 'Skills',
      subtitle: 'Arraste para girar o globo',
    },
    contact: {
      title: 'Contato',
      name: 'Seu nome',
      email: 'Seu e-mail',
      message: 'Sua mensagem',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      sent: '✓ Enviado com sucesso!',
      error: '✗ Erro ao enviar',
    },
    footer: {
      rights: 'Portfólio Profissional',
      builtWith: 'Desenvolvido com React + Vite',
    },
    notifications: {
      title: 'Notificações',
      open: 'Abrir notificações',
      empty: 'Nenhuma atividade recente.',
      error: 'Não foi possível carregar as notificações.',
      loading: 'Carregando...',
      viewAll: 'Ver tudo no GitHub',
      push: (repo, branch) => `Novo push em ${repo}${branch ? ` (${branch})` : ''}`,
      createRepo: (repo) => `Criou o repositório ${repo}`,
      createBranch: (repo, ref) => `Criou a branch ${ref} em ${repo}`,
      createTag: (repo, ref) => `Criou a tag ${ref} em ${repo}`,
      deleteRef: (repo, ref) => `Removeu ${ref} em ${repo}`,
      star: (repo) => `Deu estrela em ${repo}`,
      fork: (repo) => `Fez fork de ${repo}`,
      pr: (repo, action) => `${prActionPt(action)} um pull request em ${repo}`,
      issue: (repo, action) => `${issueActionPt(action)} uma issue em ${repo}`,
      comment: (repo) => `Comentou em ${repo}`,
      review: (repo) => `Revisou um pull request em ${repo}`,
      release: (repo) => `Publicou uma release em ${repo}`,
      public: (repo) => `Tornou ${repo} público`,
      member: (repo) => `Entrou como colaborador em ${repo}`,
      generic: (repo) => `Atividade em ${repo}`,
    },
  },
  en: {
    profile: {
      title: "Who's watching?",
    },
    nav: {
      about: 'About Me',
      projects: 'Projects',
      experiences: 'Experience',
      github: 'GitHub',
      skills: 'Skills',
      contact: 'Contact',
      backToProfiles: 'Switch profile',
    },
    language: {
      label: 'Language',
    },
    hero: {
      greeting: "Hi, I'm",
      description: 
        "Software Engineering student at PUC Minas, currently in my second semester. In my free time, I enjoy practicing my programming skills, playing soccer, watching movies, and playing video games. I am seeking my first internship opportunity in the field of software development.",
      btnText: 'See Projects',
      btnInfo: 'More Info',
    },
    projects: {
      title: 'Projects',
      inProgress: 'In development',
      items: {
        nextrip: 'App for creating complete travel itineraries with a variety of tags.',
        vigilare: 'Neighborhood safety platform with incident reports and community mapping.',
        arquivoFacil: 'Web app to facilitate the organization of invoices and check for pending payments.',
        penaltyCrash: 'Penalty shootout game with crash mechanics.',
        vemDoar: 'Platform that mobilizes blood donors.',
      },
    },
    experiences: {
      title: 'Experience',
      items: [
        {
          title: 'Software Engineering',
          place: 'PUC Minas, Coração Eucarístico',
          description:
            "Bachelor's degree in progress, currently in my 2nd semester. Focused on web development and software engineering.",
        },
        {
          title: 'Academic Projects',
          place: 'PUC Minas',
          description:
            'Development of practical projects such as NexTrip, Vigilare, and VenDor, applying HTML, CSS, JavaScript, Bootstrap, JSON Server, etc.',
        },
        {
          title: 'Personal Projects',
          place: 'Freelance / Self-taught',
          description:
            'Created Arquivo Fácil to manage invoices, and explore modern APIs and development tools.',
        },
      ],
    },
    stats: {
      title: 'Trending Now',
      subtitle: 'My GitHub activity, updated in real time',
      repos: 'Public repositories',
      stars: 'Stars',
      topLanguage: 'Top language',
      lastActivity: 'Last activity',
      languages: 'Most used languages',
      activity: 'Activity in the last 12 weeks',
      less: 'Less',
      more: 'More',
      noActivity: 'No activity',
      events: (n) => `${n} ${n === 1 ? 'event' : 'events'}`,
      reposCount: (n) => `${n} ${n === 1 ? 'repository' : 'repositories'}`,
      error: "Couldn't load GitHub data right now.",
      none: '—',
    },
    github: {
      title: 'GitHub',
      subtitle: 'Repositories updated in real time via the GitHub API',
      loading: 'Loading repositories...',
      noDescription: 'No description',
    },
    skills: {
      title: 'Skills',
      subtitle: 'Drag to spin the globe',
    },
    contact: {
      title: 'Contact',
      name: 'Your name',
      email: 'Your email',
      message: 'Your message',
      send: 'Send message',
      sending: 'Sending...',
      sent: '✓ Sent successfully!',
      error: '✗ Failed to send',
    },
    footer: {
      rights: 'Professional Portfolio',
      builtWith: 'Built with React + Vite',
    },
    notifications: {
      title: 'Notifications',
      open: 'Open notifications',
      empty: 'No recent activity.',
      error: "Couldn't load notifications.",
      loading: 'Loading...',
      viewAll: 'See everything on GitHub',
      push: (repo, branch) => `New push to ${repo}${branch ? ` (${branch})` : ''}`,
      createRepo: (repo) => `Created the repository ${repo}`,
      createBranch: (repo, ref) => `Created branch ${ref} in ${repo}`,
      createTag: (repo, ref) => `Created tag ${ref} in ${repo}`,
      deleteRef: (repo, ref) => `Deleted ${ref} in ${repo}`,
      star: (repo) => `Starred ${repo}`,
      fork: (repo) => `Forked ${repo}`,
      pr: (repo, action) => `${prActionEn(action)} a pull request in ${repo}`,
      issue: (repo, action) => `${issueActionEn(action)} an issue in ${repo}`,
      comment: (repo) => `Commented in ${repo}`,
      review: (repo) => `Reviewed a pull request in ${repo}`,
      release: (repo) => `Published a release in ${repo}`,
      public: (repo) => `Made ${repo} public`,
      member: (repo) => `Joined ${repo} as a collaborator`,
      generic: (repo) => `Activity in ${repo}`,
    },
  },
}

function prActionPt(action) {
  if (action === 'closed') return 'Fechou'
  if (action === 'merged') return 'Mesclou'
  if (action === 'reopened') return 'Reabriu'
  return 'Abriu'
}

function issueActionPt(action) {
  if (action === 'closed') return 'Fechou'
  if (action === 'reopened') return 'Reabriu'
  return 'Abriu'
}

function prActionEn(action) {
  if (action === 'closed') return 'Closed'
  if (action === 'merged') return 'Merged'
  if (action === 'reopened') return 'Reopened'
  return 'Opened'
}

function issueActionEn(action) {
  if (action === 'closed') return 'Closed'
  if (action === 'reopened') return 'Reopened'
  return 'Opened'
}
