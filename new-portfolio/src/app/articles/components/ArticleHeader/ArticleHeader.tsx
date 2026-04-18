'use client';

import { useState } from 'react';
import styles from './AticleHeader.module.css'
import { ArticleHeaderProps } from '../../../core/interfaces/mainArticle/articleHeader';

const ArticleHeader = ({title, category, date, readTime}: ArticleHeaderProps)  => {
   const  [typeCategory, setypeCategory] = useState('');

    return (
        <header className={styles.articleHeader}>
            {/* Background SVG - O seu "G" de Garcia em opacidade baixa */}
            <div className={styles.backgroundWrapper}>
                {/* O seu SVG do Figma entra aqui */}
            </div>

            <div className={styles.headerContent}>
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
            </div>
        </header>
    )

}

export default ArticleHeader;