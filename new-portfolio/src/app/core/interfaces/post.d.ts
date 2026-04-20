export interface Post {

    slug: string;
    title: string;
    excerpt: string;
    tags: string[];
    // Novos Campos para o Visual Mockup:
    imageUrl: string;
    category: string;
    author: {
        name: string;
        avatar: string; // URL da foto (ex: /assets/avatars/me.jpg)
    };
    date: string; // Ex: 'Feb 25, 2021'
    content: string;
}