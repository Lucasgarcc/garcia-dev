export interface MainArticleProps {
    post: {
        title: string;
        content: string;
        category: string;
        date: string;
        readTime?: string;
    };
}