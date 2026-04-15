'use client';

import styles from './Articles.module.css';
import { posts } from '@/app/articles/data/posts';
import PostCard from '@/app/components/ui/PostCard/PostCard';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

const Articles = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: -90 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }} 
                className={`${styles.articlesContainerTitle} container`}
            >
                <Typography
                    className={styles.artcleTitle}
                    textTransform={'uppercase'}
                    variant="h4"
                    align='center'
                    textAlign={'center'}
                    fontFamily='var(--font-title)'
                    gutterBottom
                    fontWeight={500}
                    zIndex={1000}
                >
                   Artigos Tech
                </Typography>

            </motion.div>   
            <motion.div className={`${styles.articlesContainer} container`}>
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}  
                    className={styles.articlesContent}
                >
                    <div className={styles.artilcesGrid}>
                        {posts.map((item, index) => (
                            <PostCard
                                key={item.slug}
                                post={item}
                                size={index === 0 ? 'large' : 'small'}
                            />
                        ))}
                    </div>
                </motion.div>

            </motion.div>

            
        </>
    )
};

export default Articles;
