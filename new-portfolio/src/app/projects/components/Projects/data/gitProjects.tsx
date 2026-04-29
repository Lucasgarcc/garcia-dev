import { GitProject } from '@/core/interfaces/gitProject';

const gitProjects: GitProject[] = [
    {
        id: 'flux-framework',
        title: 'Framework JavaScript Puro',
        description: 'Desenvolvimento de uma camada de estrutura do zero para entender reatividade e manipulação de DOM sob o capô.',
        branch: 'feature/vanilla-logic',
        colorBranch: '#ff4824', // orange
        commitHash: 'f7a3b1d',
        order: 0,
        tags: ['Vanilla JS', 'Observer Pattern', 'State Management'],
        slug: 'lacuna-invisivel-base-trunfo-ias',
        repoUrl: 'https://github.com/Lucasgarcc/Flux-framework',
        deployUrl: 'https://flux-framework.vercel.app',
        status: 'completed'
    },
    {
        id: 'Dog Social',
        title: 'Aplicativo de Midia Social',
        description: `Plataforma de rede social completa dedicada a entusiastas de cães. O projeto permite que donos criem perfis para seus pets, compartilhem momentos e interajam com uma comunidade apaixonada por animais. Desenvolvido com foco em escalabilidade e experiência do usuário (UX)`,
        branch: 'feature/infra-scaling',
        commitHash: 'b8e2d4c',
        colorBranch: '#91bf27', // verde 
        order: 1,
        tags: ['Web', 'App', 'Front End', 'React'],
        slug: 'aplicativo-media-social',
        repoUrl: 'https://github.com/Lucasgarcc/dog-social',
        deployUrl: 'https://dog-social-media.vercel.app',
        status: 'in-progress'
    },
    {
        id: 'Organo',
        title: 'Site Web React',
        description: ' Organo é uma aplicação desenvolvida em React que visa facilitar a gestão entre times',
        branch: 'feature/frontend-expert',
        colorBranch: '#a78bfa ', //var(--bg-purple) 
        commitHash: 'd9a1f5e',
        order: 2,
        tags: ['Web', 'App', 'Front End', 'React','Atomic Design'],
        slug: 'gestao-time',
        repoUrl: 'https://github.com/Lucasgarcc/organo',
        deployUrl: 'https://organo-garc.vercel.app',
        status: 'completed'
    },
    {
        id: 'API Node',
        title: 'RESTful Data Engine',
        description: 'Arquitetura de comunicação entre sistemas focada em métodos HTTP puros e integridade de dados no banco, cadastra e deleta.',
        branch: 'feature/rest-api',
        colorBranch: '#03ffc8',//'var(--bg-furquiose)',
        commitHash: 'c4b3a2f',
        order: 3, // Cor personalizada para este projeto
        tags: ['API RESTful', 'Fastify', 'Postgreslq'],
        slug: 'ciclo-completo-api-restful-dados',
        repoUrl: 'https://github.com/Lucasgarcc/node-zero',
        deployUrl: 'https://node-zero-w4ml.onrender.com/videos',
        status: 'completed'
    },
    {
        id: 'Book',
        title: 'Books',
        description: `O Book busca criar uma comunidade engajada de leitores, além de receber recomendações personalizadas que enriqueçam suas jornadas literárias`,
        branch: 'feature/book',
        colorBranch: '#c90000', //var(--bg-red)',
        commitHash: 'f7a3b1d',
        order: 4,
        tags: ['API RESTful', 'React', 'Full Stack'],
        slug: 'recomendacao-livros',
        repoUrl: 'https://github.com/Lucasgarcc/Book',
        deployUrl: 'https://book-ideal.vercel.app',
        status: 'in-progress'
    },
    {
        id: 'Barber-shop',
        title: 'Barber Shop Barbearia',
        description: 'Landing Page de barbearia personalizada foco em identidade visual.',
        branch: 'feature/infra-scaling',
        colorBranch: '#facc15', //var(--bg-yellow) 
        commitHash: 'b8e2d4c',
        order: 5,
        tags: ['Nginx', 'Infrastructure', 'Security'],
        slug: 'identidade-visual',
        repoUrl: 'https://github.com/Lucasgarcc/barber-shop',
        deployUrl: 'https://barber-shop-gar.vercel.app',
        status: 'completed'
    },
    /*{
        id: 'next-design-system-3',
        title: 'Core Design System',
        description: 'Criação de uma biblioteca de componentes atômicos com foco em acessibilidade e consistência visual rigorosa.',
        branch: 'feature/frontend-expert',
        colorBranch: '#66ff00',//'var(--bg-green)',
        commitHash: 'd9a1f5e',
        order: 6,
        tags: ['Next.js', 'TypeScript', 'Atomic Design'],
        slug: 'design-system-integridade-visual',
        githubUrl: 'https://github.com/Lucasgarcc/core-ui-system',
        status: 'in-progress'
    },
    {
        id: 'restful-data-engine-4',
        title: 'RESTful Data Engine',
        description: 'Arquitetura de comunicação entre sistemas focada em métodos HTTP puros e integridade de dados no banco.',
        branch: 'feature/rest-api-contract',
        colorBranch:  '#DE1A58',  // rosa
        commitHash: 'c4b3a2f',
        order: 7,
        tags: ['API RESTful', 'System Design', 'SQL'],
        slug: 'ciclo-completo-api-restful-coracao-dados',
        githubUrl: 'https://github.com/Lucasgarcc/restful-engine',
        status: 'completed'
    }*/
];

export default gitProjects;