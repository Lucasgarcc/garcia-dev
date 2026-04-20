import { Post } from '@/app/articles/data/posts';

export interface BlogCardProps {
    size: 'small' | 'large' | 'tall';
    post: Post;
}

export interface ArticleGridProps {
    relatedPosts: Post[]; // Aqui você mata o erro 'any'
}