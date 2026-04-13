'use client';

import styles from './Card.module.css';
import { motion } from 'framer-motion';
import { CardUi } from "@/app/core/interfaces/cardUi";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

const Card = ({ title, subtitle, content, className, onClose }: CardUi) => {
    return (
        <div className={styles.overlay} >

            <motion.div className={`${styles.card} ${className}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.cardHeader}>
                  
                    <header className={styles.header}>
                        <h1 className={styles.title}>{title}</h1>
                        {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
                    </header>
                    <Button  onClick={onClose} sx={{ color:'var(--primary-c-0-6)'}} className={styles.closeButton}>
                        <CloseIcon sx={{ fontSize: 25 }}/>
                    </Button>

                </div>
  
            <ul className={styles.list}>
                {content.map((item, i) => (
                    <li key={i} className={styles.listItem}>
                        <CheckIcon className={styles.icon} />
                        {item.text}
                    </li>
                ))}
            </ul>
        </motion.div>
        </div>
    )
};

export default Card;