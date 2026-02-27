'use client';

import '../../globals.css';
import React from 'react';
import styles from './Footer.module.css';
import RedeSocial from '../../../app/home/Emphasis/RedeSocial/RedeSocial';

const Footer: React.FC = () => {
    return (
        
        <footer className={styles.footer}>  
        
            <div className={styles.socialLinks}>
               <RedeSocial  redesocial={{ className: `footerContentIcon`, fontSize: 20}}/>
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