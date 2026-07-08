'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Logo from '@/app/_components/ui/Logo/Logo';
import { useNavigation } from '@/core/context/NavigationContext';
import { useThemeMode } from '@/core/context/ThemeContext';
import LinkMenu from './LinkMenu/LinkMenu';
import { NavItem } from '@/core/interfaces/nav';
import styles from './Menu.module.css';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { FaLightbulb } from 'react-icons/fa';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FolderIcon from '@mui/icons-material/Folder';
import MmsIcon from '@mui/icons-material/Mms';
import InsightsIcon from '@mui/icons-material/Insights';
import FeedIcon from '@mui/icons-material/Feed';
import { MdPsychology } from "react-icons/md";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

const Menu = ({ items }: { items: NavItem[] }) => {

    const { scrollToSection, active, setActive, page } = useNavigation();
    const { isDark, toggleTheme } = useThemeMode();
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const iconMap: Record<string, React.ReactNode> = {
        home: <OtherHousesIcon sx={{ fontSize: 24 }} className={styles.icon} />,
        intro: <OtherHousesIcon sx={{ fontSize: 20 }} className={styles.icon} />,
        about: <AnnouncementIcon sx={{ fontSize: 20 }} className={styles.iconAbout} />,
        timeline: <ViewTimelineIcon className={styles.icon} />,
        differential: <FaLightbulb className={styles.icon} />,
        contact: <ContactMailIcon sx={{ fontSize: 20 }} className={styles.icon} />,
        projects: <FolderIcon sx={{ fontSize: 20 }} className={styles.icon} />,
        post: <MmsIcon sx={{ fontSize: 20 }} className={styles.icon} />,
        skills: <MdPsychology fontSize={26.5} className={styles.icon} />,
        technicalLevel: <InsightsIcon sx={{ fontSize: 25 }} className={styles.icon} />,
        articles: <FeedIcon sx={{ fontSize: 25 }} className={styles.icon} />,
        artRelated: <SpeakerNotesIcon sx={{ fontSize: 23 }} className={styles.icon} />
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

        e.preventDefault();
        setOpen(false);
        router.push(item.href);
    };

    const currentIsDark = mounted ? isDark : false;

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

            <button
                type="button"
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label={`Ativar modo ${currentIsDark ? 'claro' : 'escuro'}`}
                title={`Ativar modo ${currentIsDark ? 'claro' : 'escuro'}`}
                disabled={!mounted} // Opcional: evita cliques falsos antes do carregamento total
            >
                {currentIsDark ? <MdLightMode className={styles.icon} size={18} /> : <MdDarkMode size={18} />}
                <span className={styles.themeToggleLabel}>
                    {currentIsDark ? 'Light' : 'Dark'}
                </span>
            </button>
        </nav>
    );
};

export default Menu;
