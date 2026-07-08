'use client';

import { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import RedeSocial from '../../../home/components/Emphasis/RedeSocial/RedeSocial';
import { useThemeMode  } from '@/core/context/ThemeContext';

const Footer: React.FC = () => {

    const [mounted, setMounted] = useState(false);

    const { isDark } = useThemeMode();

    useEffect(() => {
        setMounted(true);
    }, []);

    const footerStyle = {
        border: mounted && isDark ? "1px solid var(--text-muted)" : "none"
    };

    return (

        <footer className={styles.footer} style={footerStyle}>

            <div className={styles.socialLinks}>
                <RedeSocial redesocial={{ className: `footerContentIcon`, fontSize: 20 }} />
            </div>
            <div className={styles.footerTextContainer}>
                <p className={styles.footerText}>
                    | © 2026 Lucas Garcia. All rights reserved
                </p>
            </div>

        </footer>
    )
};
export default Footer;