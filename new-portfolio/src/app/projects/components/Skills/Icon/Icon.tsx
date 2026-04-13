'use client';

// Importe SkillIconProps em vez de Skill
import { SkillIconProps } from '@/app/core/interfaces/skill';
import styles from './Icon.module.css';
import { motion } from 'framer-motion';
import React from 'react';

// Use SkillIconProps para tipar as props do componente
const Icon = ({ name, icon, shadowColor, className }: SkillIconProps) => {

    const dynamicStyles = {
        '--shadow-color': shadowColor,
    } as React.CSSProperties;

    return (
        <motion.div
            className={styles.skillCard}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            style={dynamicStyles}
        >
            <div className={styles.iconWrapper}>
                {/* O TS não apontará erro aqui se as props estiverem corretas */}
                {icon}
            </div>

            {/* Use um fallback caso name seja opcional */}
            <span className={styles.tooltip}>{name || 'Skill'}</span>

            <div className={styles.glow} />
        </motion.div>
    );
};

export default Icon;