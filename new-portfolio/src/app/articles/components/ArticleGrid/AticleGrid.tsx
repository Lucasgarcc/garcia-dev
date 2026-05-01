// components/ArticleGrid.tsx
import styles from './ArticleGrid.module.css';
import { motion } from 'framer-motion';
import ArticleCard from '@/app/_components/ui/PostCard/PostCard'; // Reutilize o card que você já tem
import { ArticleGridProps } from '@/app/core/interfaces/blogCard';

const ArticleGrid = ({ relatedPosts }: ArticleGridProps) => {
    return (
        <motion.section className={styles.gridContainer}>
            <header className={styles.gridHeader}>
                <h2 className={styles.gridTitle}>Continue explorando</h2>
                <div className={styles.divider} />
            </header>

            <div className={styles.gridLayout}>
                {relatedPosts.map((post, index) => (
                    <ArticleCard
                        key={post.slug}
                        post={post}
                        size={index === 0 ? 'large' : 'small'}
                    />
                ))}
            </div>
        </motion.section>
    );
}

export default ArticleGrid;