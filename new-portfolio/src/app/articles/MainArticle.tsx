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
import { useLanguage } from '@/app/core/context/LanguageContext';

const MainArticle = ({ post }: MainArticleProps) => {
    const currentSlug = post.slug;
    const { page, refs } = useNavigation();
    const { language, t } = useLanguage();

    // Early return se não estiver na página de artigos
    if (!page.includes('article')) return null;

    const relatedPosts = posts
        .filter(p => p.slug !== currentSlug)
        .slice(0, 3);
    const translatedPost = t.articleItems[currentSlug as keyof typeof t.articleItems];
    const translatedPostMeta = t.articleMeta[currentSlug as keyof typeof t.articleMeta];
    const translatedRelatedPosts = relatedPosts.map(relatedPost => ({
        ...relatedPost,
        ...(t.articleItems[relatedPost.slug as keyof typeof t.articleItems] ?? {}),
        ...(t.articleMeta[relatedPost.slug as keyof typeof t.articleMeta] ?? {}),
    }));

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
    
                    title={translatedPost?.title ?? post.title}
                    category={translatedPostMeta?.category ?? post.category ?? 'Tech'}
                    date={translatedPostMeta?.date ?? post.date}
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
                            {language === 'en' ? (post.contentEn ?? post.content) : post.content}
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
                <h2 className={styles.relatedTitle}>{t.nav.relatedArticles}</h2>
                <ArticleGrid relatedPosts={translatedRelatedPosts} />
            </section>
        </motion.div>
    );
};

export default MainArticle;
