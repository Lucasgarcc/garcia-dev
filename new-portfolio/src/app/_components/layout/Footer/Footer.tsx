'use client';

import React from 'react';
import styles from './Footer.module.css';
import RedeSocial from '../../../home/components/Emphasis/RedeSocial/RedeSocial';
import { useThemeMode  } from '@/core/context/ThemeContext';

const Footer: React.FC = () => {

    const { isDark } = useThemeMode();
    return (

        <footer className={styles.footer} style={
            !isDark ? { 
                border: '1px solid var(--text-muted)' 
            } :
            {} 
        }>

            <div className={styles.socialLinks}>
                <RedeSocial redesocial={{ className: `footerContentIcon`, fontSize: 20 }} />
            </div>
            <div className={styles.footerTextContainer}>
                <p className={styles.footerText}>
                    | © 2025 Lucas Garcia. All rights reserved
                </p>
            </div>

        </footer>
    )
};
export default Footer;