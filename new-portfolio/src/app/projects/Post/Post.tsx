'use client';

import React from 'react';
import styles from './Post.module.css';
import { motion } from 'framer-motion';

interface PostProps {
    title: string;
    content: string;
    imageUrl?: string | null;
}

const Post = ({ title, content, imageUrl = null}: PostProps) => {
    return (
        <motion.div className={styles.postContainer}>
            <h1>Dogs Social</h1>
            {imageUrl && (  
                <div className={styles.imageWrapper}>
                    <img 
                        src={imageUrl} 
                        alt={title}     
                        className={styles.postImage}
                    />
                </div>
            )}
            <div className={styles.textContent}>
                <h2 className={styles.postTitle}>{title}</h2>
                <p className={styles.postContent}>{content}</p>
            </div>
        </motion.div>
    );
}

export default Post;