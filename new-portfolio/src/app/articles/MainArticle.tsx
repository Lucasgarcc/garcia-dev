'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/core/context/NavigationContext';
import { MainArticleProps } from '@/core/interfaces/mainArticle/mainArticle';
import ArticleHeader from './components/ArticleHeader/ArticleHeader';
import { posts } from './data/posts';
import ArticleGrid from './components/ArticleGrid/AticleGrid';
import styles from './MainArticle.module.css';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MainArticle = ({ post }: MainArticleProps) => {
    const currentSlug = post.slug;
    const { page, refs } = useNavigation();

    // Early return se não estiver na página de artigos
    if (!page.includes('article')) return null;

    const relatedPosts = posts
        .filter(p => p.slug !== currentSlug)
        .slice(0, 3);

    return (
        <motion.div
            className="mainArticle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <section id="artContent"
                ref={refs.articles.artContent}>
                {/* Header com as informações do post */}
                <ArticleHeader
    
                    title={post.title}
                    category={post.category || 'Tech'}
                    date={post.date}
                    readTime={post.readTime}
                />

                {/* Conteúdo Principal do Markdown */}
                <div
                    className={
                        `${styles.container} sectionWrapper container`
                    }
                >
                    <div className={styles.markdownBody}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </section>

            {/* Grid de outros artigos para manter o usuário no site */}
            <section
                id="artRelated"
                ref={refs.articles.artRelated}
                className={styles.relatedSection}
            >
                <h2 className={styles.relatedTitle}>Outros Artigos</h2>
                <ArticleGrid relatedPosts={relatedPosts} />
            </section>
        </motion.div>
    );
};

export default MainArticle;