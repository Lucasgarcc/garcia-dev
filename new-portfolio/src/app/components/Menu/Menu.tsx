'use client';

import React from 'react';
import LinkMenu from '@/app/components/Menu/LinkMenu/LinkMenu';
import { NavItem } from '@/app/types/nav';
import styles from './Menu.module.css'
import { useNavigation } from '@/hooks/context/NavigationContext';


const Menu = ({items}:  {items: NavItem[]}) => {
  const { scrollToSection } = useNavigation(); 
   return (

        <nav className={styles.menuContainer}>
            {items.map((item) => (
                <LinkMenu
                    key={item.id}
                    id={item.id}
                    href={item.href}
                    underline={false}
                    active={false}
                    onClick={(e) => {
                        e.preventDefault(); // evita navegação padrão
                        scrollToSection(item.id as keyof ReturnType<typeof useNavigation>['refs']);
                    }}
                >
                    {item.label}
                </LinkMenu>
            ))}
        </nav>

    );
};

export default Menu;