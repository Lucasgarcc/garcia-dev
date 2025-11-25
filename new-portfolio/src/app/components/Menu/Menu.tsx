'use client';

import React, { useState } from 'react';
import LinkMenu from '@/app/components/Menu/LinkMenu/LinkMenu';
import { NavItem } from '@/app/types/nav';
import styles from './Menu.module.css'
import { useNavigation } from '@/hooks/context/NavigationContext';

const Menu = ({items}:  {items: NavItem[]}) => {

    const { scrollToSection, active, setActive } = useNavigation(); 
    const [ open, setOpen ] = useState(false);

    return (
        <nav className={`${styles.menuContainer} ${open ? styles.active : ''} `}>
            
            {/* Hamburger Menu */}
            <div className={`${styles.hamburger} ${open ? styles.active: ''}`} 
                onClick={() => setOpen(!open)}  >
                <span className={styles.bar1}></span>
                <span className={styles.bar2}></span>
                <span className={styles.bar3}></span>
            </div>

            {/* Links do Menu */}
            <div className={`${styles.menuContent} ${open ? styles.showMenu : ''}`}>
                {items.map((item) => (

                    <LinkMenu
                            key={item.id}
                            id={item.id}
                            href={item.href}
                            underline={false}
                            active={active === item.id}
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(item.id) // evita navegação padrão
                                scrollToSection(item.id as keyof ReturnType<typeof useNavigation>['refs']);
                            }}
                        >
                        {item.label}
                    </LinkMenu>
                
                ))} 
            </div>
        </nav>

    );
};

export default Menu;