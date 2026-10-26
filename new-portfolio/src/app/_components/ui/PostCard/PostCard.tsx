'use client';

import styles from './PostCard.module.css'
import { motion } from "framer-motion";
import Image from 'next/image'; 
import Link from 'next/link';
import { BlogCardProps } from '@/app/core/interfaces/blogCard';


const PostCard = ({ size, post }: BlogCardProps) => {
    const sizeClass = styles[`card${size.charAt(0).toUpperCase() + size.slice(1)}`];

    const bgUrl = post.imageUrl;
    
    return (
        /* <Link href={`/articles/${post.slug}`} scroll={false} className={`${styles.linkWrapper} ${sizeClass}`}>*/
        <Link href={`/articles/${post.slug}`} scroll={false} className={`${styles.linkWrapper} ${sizeClass}`}>
            <motion.article
                className={`${styles.baseCard} ${sizeClass}`}
                whileHover={{ scale: 1.02, boxShadow: "0px 10px 40px rgba(0,0,0,0.5)" }}
                style={{
                    // Aplicação da imagem de fundo técnica
                    backgroundImage: `linear-gradient(to bottom, rgba(30,30,40,0.2) 0%, rgba(30,30,40,0.95) 100%), url("${bgUrl}")`,
                }}
            >
                {/* 1. Tag (Badge) */}
                <span className={styles.badge}>{post.tags[0]}</span>

                {/* 2. Conteúdo Central (Título e Excerpt) */}
                <div className={styles.content}>
                    <p className={styles.date}>{post.date}</p>
                    <h3>{post.title}</h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                </div>

                {/* 3. Footer (Autor) */}
                <footer className={styles.footer}>
                    <div className={styles.authorAvatar}>
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={36}
                            height={36}
                            className={styles.avatarImg}
                        />
                    </div>
                    <span>{post.author.name}</span>
                </footer>
            </motion.article>
        </Link>
    );
};

export default PostCard;
