'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Logo from '@/components/ui/Logo/Logo';
import { useNavigation } from '@/core/context/NavigationContext';
import LinkMenu from './LinkMenu/LinkMenu';
import { NavItem } from '@/core/interfaces/nav';
import styles from './Menu.module.css';
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdViewTimeline } from "react-icons/md";
import { FaLightbulb } from 'react-icons/fa';
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";

const Menu = ({ items }: { items: NavItem[] }) => {
    const { scrollToSection, active, setActive, page } = useNavigation();
    const [open, setOpen] = useState(false);

    const iconMap: Record<string, React.ReactNode> = {
        home: <FaHome className = { styles.icon } />,
        intro: <FaHome className={styles.icon} />,
        about: <FcAbout className={styles.iconAbout}/>,
        timeline: <MdViewTimeline className = {styles.icon
    } />,
        diferencial: <FaLightbulb className={styles.icon} />,
        contato: <IoChatboxEllipsesSharp className={styles.icon} />,
        projects: <FaFolder className={styles.icon} />,
    };


    const router = useRouter();

    const handleClick = (e: React.MouseEvent, item: NavItem) => {

        if (item.type === 'section' && item.page === page) {
            e.preventDefault();
            setActive(item.id);
            scrollToSection(item.id);
            setOpen(false);
            return;
        }

        // Qualquer outro caso → navegação
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

            <Logo colorPrimary='#91bf27' colorSecondary='#595959' className={`${open ? styles.logo : ''}`} />

            {/* Menu */}
            <div className={`${styles.menuContent} ${open ? styles.showMenu : ''}`}>
                {items.map(item => {
                    const IconComponent = iconMap[item.id] || iconMap[item.page]
                    return (
                    <LinkMenu
                        key={item.id}
                        id={item.id}
                        href={item.href}
                        underline={false}
                        active={active === item.id}
                        onClick={e => handleClick(e, item)} 
                        icon={open ? IconComponent : null}
                    >
                        {item.label}
                    </LinkMenu>
                    )
                })}
            </div>
        </nav>
    );
};

export default Menu;