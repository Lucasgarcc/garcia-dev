// components/ArticleGrid.tsx
import styles from './ArticleGrid.module.css';
import { motion } from 'framer-motion';
import ArticleCard from '@/app/_components/ui/PostCard/PostCard'; // Reutilize o card que você já tem
import { ArticleGridProps } from '@/app/core/interfaces/blogCard';
import { useLanguage } from '@/app/core/context/LanguageContext';

const ArticleGrid = ({ relatedPosts }: ArticleGridProps) => {
    const { t } = useLanguage();
    return (
        <motion.section className={styles.gridContainer}>
            <header className={styles.gridHeader}>
                <h2 className={styles.gridTitle}>{t.articleUi.continueExploring}</h2>
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
