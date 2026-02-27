'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Logo from '../Logo/Logo';
import { useNavigation } from '../../context/NavigationContext'
import LinkMenu from '@/app/components/Menu/LinkMenu/LinkMenu';
import { NavItem } from '@/app/types/nav';
import styles from './Menu.module.css';


const Menu = ({ items }: { items: NavItem[] }) => {
    const { scrollToSection, active, setActive, page } = useNavigation();
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const handleClick = (e: React.MouseEvent, item: NavItem) => {

        if (item.type === 'section' && item.page === page) {
            e.preventDefault();
            setActive(item.id);
            scrollToSection(item.id);
            setOpen(false);
            return;
        }

        // 🔹 2. Qualquer outro caso → navegação
        e.preventDefault();
        setOpen(false);
        router.push(item.href);
    };

    return (
        <nav className={`${styles.menuContainer} ${open ? styles.active : ''}`}>

            {/* Hamburger */}
            <div
                className={`${styles.hamburger} ${open ? styles.active : ''}`}
                onClick={() => setOpen(!open)}
            >
                <span className={styles.bar1}></span>
                <span className={styles.bar2}></span>
                <span className={styles.bar3}></span>
            </div>

            <Logo colorPrimary='#91bf27' colorSecondary='#595959' className={`${open ? styles.logo : ''}` } />

            {/* Menu */}
            <div className={`${styles.menuContent} ${open ? styles.showMenu : ''}`}>
                {items.map(item => (
                    <LinkMenu
                        key={item.id}
                        id={item.id}
                        href={item.href}
                        underline={false}
                        active={active === item.id}
                        onClick={e => handleClick(e, item)}
                    >
                        {item.label}
                    </LinkMenu>
                ))}
            </div>
        </nav>
    );
};

export default Menu;
