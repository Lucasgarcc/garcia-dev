'use client';

import { useState } from 'react';
import styles from './AticleHeader.module.css'
import { ArticleHeaderProps } from '../../../core/interfaces/mainArticle/articleHeader';
import { motion } from 'framer-motion';

const ArticleHeader = ({title, category, date, readTime}: ArticleHeaderProps)  => {
   const  [typeCategory, setypeCategory] = useState('');

    return (
        <header className={styles.articleHeader}>
            {/* Background SVG - O seu "G" de Garcia em opacidade baixa */}
            <div className={styles.backgroundWrapper}>
                {/* O seu SVG do Figma entra aqui */}
            </div>

            <motion.div
                initial={{ opacity: 0, x: -90 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }} 
                className={styles.headerContent}
            >
                {/* Tag de Categoria */}
                <span className={`${styles.categoryTag} ${typeCategory === 'JavasCript' ? 'var(--JS-bg-color)' : 'var(--primary-c)'} `}>
                    {category}
                </span>

                {/* Título */}
                <h1 className={styles.title}>
                    {title}
                </h1>

                {/* Metadados */}
                <div className={styles.articleMeta}>
                    <span>{date}</span>
                    <span className={styles.metaSeparatorWrapper}>
                        <span className={styles.metaDot} />
                        {readTime} de leitura
                    </span>
                </div>
            </motion.div>
        </header>
    )

}

export default ArticleHeader;