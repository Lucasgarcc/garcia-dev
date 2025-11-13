'use client';
import React from 'react';
import NextLink from 'next/link';
import styles from './LinkMenu.module.css';
import { link } from '@/app/types/linkMenu';

const LinkMenu = ({
    id,
    href,
    children,
    underline = false,
    active = false,
    onClick,
}: link & { onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => {
    return (
        <NextLink
            id={id}
            href={href}
            onClick={onClick}
            className={`${styles.link} ${underline ? styles.underline : ''} ${active ? styles.active : ''}`}
        >
            {children}
        </NextLink>
    );
};

export default LinkMenu;
