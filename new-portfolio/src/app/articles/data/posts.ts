// app/articles/data/posts.ts

export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    tags: string[];
    // Novos Campos para o Visual Mockup:
    imageUrl: string;
    author: {
        name: string;
        avatar: string; // URL da foto (ex: /assets/avatars/me.jpg)
    };
    date: string; // Ex: 'Feb 25, 2021'
    content: string;
}

export const posts: Post[] = [
    {
        slug: 'framework-vanilla-js',
        title: 'Engenharia de Frameworks: Vanilla JS',
        excerpt: 'Como construir um sistema de reatividade e renderização sem depender de bibliotecas externas.',
        tags: ['Under the hood'],
        imageUrl: 'https://i0.wp.com/admove.co.uk/wp-content/uploads/2025/11/placeholder-1.png?ssl=1', // Imagem 3D/técnica sutil
        author: { name: 'Seu Nome', avatar: '/assets/avatars/seuanjo3d.png' },
        date: '10 min read',
        content: 'Conteúdo completo...'
    },
    {
        slug: 'nginx-reverse-proxy',
        title: 'Nginx e Delegação de Requisições',
        excerpt: 'Entenda como o proxy reverso otimiza a escalabilidade de aplicações Next.js.',
        tags: ['DevOps'],
        imageUrl: 'https://i0.wp.com/admove.co.uk/wp-content/uploads/2025/11/placeholder-1.png?ssl=1',
        author: { name: 'Seu Nome', avatar: '/assets/avatars/seuanjo3d.png' },
        date: 'Feb 16, 2021',
        content: 'Conteúdo técnico sobre Nginx...'
    },
    {
        slug: 'escalabilidade-frontend',
        title: 'Arquitetura para Projetos Reais',
        excerpt: 'Patterns de escalabilidade: como organizar pastas e contextos.',
        tags: ['Architecture'],
        imageUrl: 'https://i0.wp.com/admove.co.uk/wp-content/uploads/2025/11/placeholder-1.png?ssl=1',
        author: { name: 'Seu Nome', avatar: '/assets/avatars/seuanjo3d.png' },
        date: 'Feb 18, 2021',
        content: 'Patterns de escalabilidade...'
    },
    {
        slug: 'pensamento-logico-dev',
        title: 'Decomposição e Solução de Problemas',
        excerpt: 'Estratégias para abordar problemas de engenharia complexos.',
        tags: ['Engineering'],
        imageUrl: 'https://i0.wp.com/admove.co.uk/wp-content/uploads/2025/11/placeholder-1.png?ssl=1',
        author: { name: 'Seu Nome', avatar: '/assets/avatars/seuanjo3d.png' },
        date: 'Feb 20, 2021',
        content: 'Metodologias de lógica...'
    }
];