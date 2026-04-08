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
        <>
            <Typography
                color="var(--primary-c-0-3)"
                variant="h4"
                textTransform="uppercase"
                marginTop={8}
                marginBottom={4}

                fontFamily="var(--font-title)"
                gutterBottom
                fontWeight={500}
            >
                <strong >

                    PROJETO DESTAQUE
                </strong>
            </Typography>
            <motion.div className={styles.postContainer}>



                <div className={styles.postContent}>

                    <h1 className='titleSubtitle'>{title}</h1>
                    {imageUrl && (
                        <div className={styles.imageWrapper}>
                            <Image
                                src={imageUrl}
                                alt={title}
                                className={styles.postImage}
                                width={1200}
                                height={675}
                                sizes="(max-width: 768px) 100vw, 60vw"
                            />
                        </div>
                    )}
                </div>

                <div className={styles.textContent}>
                    <h2 className={`${styles.postTitle} title`}>{title}</h2>
                    <p className={`${styles.postContent} description`} >{content}</p>
                </div>
            </motion.div>
        </>

    );
}

export default Post;
