'use client';

import styles from './Post.module.css';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

interface PostProps {
    title: string;
    content: string;
    imageUrl?: string | null;
}

const Post = ({ title, content, imageUrl = null }: PostProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 90 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Typography
                color="var(--primary-c-0-3)"
                variant="h4"
                textTransform="uppercase"
                marginTop={8}
                marginBottom={4}
                fontFamily="var(--font-title)"
                gutterBottom
                fontWeight={500}
             className={styles.postTitle} >
                PROJETO DESTAQUE 
            </Typography>
            <motion.div 
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={styles.postContainer}
            >

                <div className={styles.postContent}>

                    <h1 className='titleSubtitle'>{title}</h1>
                    {imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }} 
                            className={styles.imageWrapper}
                        
                        >
                            <Image
                                src={imageUrl}
                                alt={title}
                                className={styles.postImage}
                                width={1200}
                                height={675}
                                sizes="(max-width: 768px) 100vw, 60vw"
                            />
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }} 
                    className={styles.textContent}
                    >
                    <h2 className={styles.postTitleProject}>{title}</h2>
                    <p className={`${styles.postContent} description`} >{content}</p>
                </motion.div>
            </motion.div>
        </motion.div>

    );
}

export default Post;
