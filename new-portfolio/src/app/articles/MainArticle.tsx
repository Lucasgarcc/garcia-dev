'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/core/context/NavigationContext';


interface MainArticleProps {
    post: {
        title: string;
        content: string;
    };
}

const MainArticle = ({ post }: MainArticleProps) => {
    const { page, refs } = useNavigation();

    
    if (page !== 'articles') return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="article-wrapper"
        >
            <section ref={refs.articles.artContent} id="artContent">
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