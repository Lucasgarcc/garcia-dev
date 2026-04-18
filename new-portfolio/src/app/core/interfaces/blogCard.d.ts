import { Post } from '@/app/articles/data/posts';

export interface BlogCardProps {
    size: 'small' | 'large' | 'tall';
    post: Post;
}