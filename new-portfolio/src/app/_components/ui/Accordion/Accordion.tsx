'use client';

import { useState } from 'react';
import { AccordionProps } from '@/app/core/interfaces/accordion';
import styles from './Accordion.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Accordion = ({ icon, title, subtitle, content, className }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Estado para o pull down interno
    const [isExpanded, setIsExpanded] = useState(false);

    const item_limit = 4;
    const hasMoreItems = content.length > item_limit;

    const displayedContent = isExpanded ? content : content.slice(0, item_limit);
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
                    <ExpandMoreIcon className={styles.iconArrow} sx={isOpen ? { color: 'var(--green-100)', fontSize: 30 } : {fontSize: 30}}/>
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
                        {displayedContent.map((item, i) => (
                            <motion.li
                                layout // Mantém a transição suave ao adicionar/remover itens
                                key={i}
                                className={styles.listItem}
                            >
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemName}>
                                        {item.iconStask}
                                        <span>{item.title}</span>
                                    </div>
                                </div>

                                <div className={styles.progressBack}>
                                    <motion.div
                                        className={styles.progressFront}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progess}%` }}
                                        transition={{ duration: 2, delay: 0.2 }}
                                    />
                                </div>
                            </motion.li>
                        ))}

                        {/* Botão de Pull Down inserido como o último item da lista */}
                        {hasMoreItems && (
                            <li className={styles.pullDownWrapper}>
                                <button
                                    className={styles.pullDownBtn}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita fechar o accordion
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
                                        {isExpanded ? (
                                            'Recolher'
                                        ) : (
                                            <>
                                                Ver Mais{' '}
                                            </>
                                        )}
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