'use client';

import { useState } from 'react';
import { AccordionProps } from '@/app/core/interfaces/accordion';
import styles from './Accordion.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Accordion = ({ icon, title, subtitle, content, className }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div className={`${styles.accordionWrapper} ${className} `} 
            animate={{
                padding: isOpen ? '2rem 1.5rem' : '1.2rem'
            }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.titleGroup}>
                    <span className={styles.mainIcon}>{icon}</span>
                    <div>
                        <h2 className={styles.title}>{title}</h2>
                        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ExpandMoreIcon className={styles.iconArrow} sx={isOpen ? { color: 'var(--primary-c-0-1)', fontSize: 30 } : {fontSize: 30}}/>
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles.list}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                            padding: '1rem 1rem', height: 'auto', 
                            opacity: 1 
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            padding: { duration: 0.4 },
                            height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }, // Ease mais natural
                            opacity: { duration: 0.25 }
                        }}
                    >
                        {content.map((item, i) => (
                            <li key={i} className={styles.listItem}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemName}>
                                        {/* Se for um componente, renderiza como <Icon />.*/}
                                        {item.iconStask}
                                        <span>{item.title}</span>
                                    </div>

                                </div>

                                {/* Barra de Progresso Minimalista */}
                                <div className={styles.progressBack}>
                                    <motion.div
                                        className={styles.progressFront}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progess}%` }}
                                        transition={{ duration: 2, delay: 0.2 }}
                                    />
                                </div>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Accordion;