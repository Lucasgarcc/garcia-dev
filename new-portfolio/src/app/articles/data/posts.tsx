import { Post } from '@/core/interfaces/post';
import avatar from '../../../assets/avatar.png';
import architecture from '../../../assets/bg-architecture.svg?url';
import mind from '../../../assets/mind.webp';

export const posts: Post[] = [
    {
        slug: 'framework-vanilla-js',
        title: 'Engenharia de Frameworks: Vanilla JS',
        excerpt: 'Como construir um sistema de reatividade e renderização sem depender de bibliotecas externas.',
        tags: ['Front End Developement'],
        imageUrl: 'https://wallpaperbat.com/img/156532-javascript-minimalism-wallpaper-hd-desktop-and-mobile-background.jpg', // Imagem 3D/técnica sutil
        author: { name: 'Lucas Garcia', avatar: avatar.src},
        date: '10 min read',
        category: 'JavaScript',
        content: 'Conteúdo completo...'
    },
    {
        slug: 'nginx-reverse-proxy',
        title: 'Nginx e Delegação de Requisições',
        excerpt: 'Entenda como o proxy reverso otimiza a escalabilidade de aplicações Next.js.',
        tags: ['DevOps'],
        imageUrl: 'https://nginxblog-8de1046ff5a84f2c-endpoint.azureedge.net/blobnginxbloga72cde487e/wp-content/uploads/2024/11/Feature-LI-Alt-1200x628-2.png',
        author: { name: 'Lucas Garcia', avatar: avatar.src },
        date: 'Feb 16, 2021',
        category: 'Orquestrador Front End',
        content: 'Conteúdo técnico sobre Nginx...'
    },
    {
        slug: 'escalabilidade-frontend',
        title: 'Arquitetura para Projetos Reais',
        excerpt: 'Patterns de escalabilidade: como organizar pastas e contextos.',
        tags: ['Architecture'],
        imageUrl: architecture,
        author: { name: 'Lucas Garcia', avatar: avatar.src },
        category: 'Arquitetura de Software',
        date: 'Feb 18, 2021',
        content: 'Patterns de escalabilidade...'
    },
    {
        slug: 'pensamento-logico-dev',
        title: 'Decomposição e Solução de Problemas',
        excerpt: 'Estratégias para abordar problemas de engenharia complexos.',
        tags: ['Engineering'],
        imageUrl: mind.src,
        author: { name: 'Lucas Garcia', avatar: avatar.src },
        category: 'Lógica',
        date: 'Feb 20, 2021',
        content: 'Metodologias de lógica...'
    }
];