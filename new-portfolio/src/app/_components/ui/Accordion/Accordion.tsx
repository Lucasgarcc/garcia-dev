'use client';

import { useState } from 'react';
import { AccordionProps } from '@/app/core/interfaces/accordion';
import styles from './Accordion.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLanguage } from '@/app/core/context/LanguageContext';

const Accordion = ({ icon, title, subtitle, content, className }: AccordionProps) => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // Estado para o pull down interno
    const [isExpanded, setIsExpanded] = useState(false);

    const item_limit = 4;
    const hasMoreItems = content.length > item_limit;
    const accordionId = `accordion-${(title ?? 'item').replace(/\s+/g, '-').toLowerCase()}`;

    const displayedContent = isExpanded ? content : content.slice(0, item_limit);

    // Cálculos matemáticos fixos para o desenho do círculo SVG
    const radius = 32;
    const circumference = 2 * Math.PI * radius;

    return (
        <motion.div className={`${styles.accordionWrapper} ${className} `} 
            animate={{
                padding: isOpen ? '2rem 1.5rem' : '1.2rem',
            }}
            transition={{ duration: 0.4 }}
        >
            <button type="button" className={styles.header} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls={accordionId}>
                <div className={styles.titleGroup}>
                    <span className={styles.mainIcon}>{icon}</span>
                    <div>
                        <h2 className={styles.title}>{title}</h2>
                        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                    </div>
                </div>

                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ExpandMoreIcon className={styles.iconArrow} sx={isOpen ? { color: 'var(--green-100)', fontSize: 30 } : {fontSize: 30}}/>
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles.list}
                        id={accordionId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                            padding: '1rem', height: 'auto', 
                            opacity: 1 
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            padding: { duration: 0.4 },
                            height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }, // Ease mais natural
                            opacity: { duration: 0.25 }
                        }}
                    >
                        {displayedContent.map((item, i) => {
             
                            const currentProgress = item.progess ?? 0; 
                            const strokeDashoffset = circumference - (currentProgress / 100) * circumference;

                            return (
                                <motion.li
                                    layout
                                    key={i}
                                    className={styles.listItem}
                                >
                                    {/* Nova estrutura visual: Círculo ao redor do Ícone */}
                                    <div className={styles.radialContainer}>
                                        <svg className={styles.radialSvg}>
                                            <circle
                                                cx="36"
                                                cy="36"
                                                r={radius}
                                                className={styles.radialTrack}
                                                strokeWidth="4"
                                                fill="transparent"
                                            />
                                            <motion.circle
                                                cx="36"
                                                cy="36"
                                                r={radius}
                                                className={styles.radialProgress}
                                                strokeWidth="4"
                                                fill="transparent"
                                                strokeDasharray={circumference}
                                                initial={{ strokeDashoffset: circumference }}
                                                animate={{ strokeDashoffset: strokeDashoffset }}
                                                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                                            />
                                        </svg>
                                        
                                        {/* Renderiza o ícone stask do pai centralizado */}
                                        <div className={styles.centerIcon}>
                                            {item.iconStask}
                                        </div>
                                    </div>

                                    {/* Textos informativos empilhados abaixo do círculo */}
                                    <div className={styles.itemMeta}>
                                        <span className={styles.itemTitle}>{item.title}</span>
                                    </div>
                                </motion.li>
                            );
                        })}

                        {/* Botão de Pull Down original preservado */}
                        {hasMoreItems && (
                            <li className={styles.pullDownWrapper}>
                                <button
                                    className={styles.pullDownBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(!isExpanded);
                                    }}
                                >
                                    <motion.div
                                        animate={{ y: isExpanded ? 0 : [0, 4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        {isExpanded ? <KeyboardArrowUpIcon className={styles.iconArrow} /> : <KeyboardArrowDownIcon className={styles.iconArrow} />}
                                    </motion.div>
                                    <span>
                                        {isExpanded ? t.common.collapse : t.common.seeMore}
                                    </span>
                                </button>
                            </li>
                        )}
                    </motion.ul>
                    
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Accordion;
