'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/core/context/NavigationContext';
import { MainArticleProps } from '@/core/interfaces/mainArticle/mainArticle';
import ArticleHeader
 from './components/ArticleHeader/ArticleHeader';
const MainArticle = ({ post }: MainArticleProps) => {
    
    const { page, refs } = useNavigation();

    if (page !== 'articles') return null;

    return (
        <motion.div
            className="mainArticle"
        >
            <ArticleHeader
                title={post.title}
                category={post.category || 'Tech'} // Garanta que seu post tenha essa prop
                date={post.date}
                readTime={post.readTime}
            />
            <section ref={refs.articles.artContent} className='sectionWrapper' id="artContent">
                <h1>{post.title}</h1>
                <div className="markdown-body">
                    {post.content}
                </div>
            </section>

            {/* Você pode adicionar as outras seções (artCode, artRelated) aqui */}
        </motion.div>
    );
};

export default MainArticle;