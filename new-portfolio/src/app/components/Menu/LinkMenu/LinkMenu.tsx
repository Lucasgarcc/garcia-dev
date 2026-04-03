'use client';
import React from 'react';
import NextLink from 'next/link';
import styles from './LinkMenu.module.css';
import { link } from '@/core/interfaces/linkMenu';

const LinkMenu = ({
    id,
    href,
    children,
    underline = false,
    active = false,
    onClick,
    icon
}: link & { onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => {
    return (
  
        <NextLink
            id={id}
            href={href}
            onClick={onClick}
            className={`${styles.link} ${underline ? styles.underline : ''} ${active ? styles.active : ''}`}
        >
            
            {/* O ícone agora fica dentro do link para melhor área de clique */}
            <div className={ icon ? styles.MobileContainer : ''}>
                {icon && <span className={styles.iconWrapper}>{icon}</span>}
                <p>
                    {children}
                </p>
            </div>
    
        </NextLink>
        

    );
};

export default LinkMenu;