export interface MainArticleProps {
    post: {
        slug: string;
        title: string;
        content: string;
        contentEn?: string;
        category: string;
        date: string;
        readTime?: string;
    };
}

