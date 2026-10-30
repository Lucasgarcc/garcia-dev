'use client';

import { useState } from 'react';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';

import Logo from '@/app/_components/ui/Logo/Logo';
import { useNavigation } from '@/core/context/NavigationContext';
import { useThemeMode } from '@/core/context/ThemeContext';
import { useLanguage } from '@/core/context/LanguageContext';
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
    const { language, toggleLanguage } = useLanguage();
    const [open, setOpen] = useState(false);
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

    const handleClick = (e: React.MouseEvent, item: NavItem) => {
        if (item.type === 'section' && item.page === page) {
            e.preventDefault();
            setActive(item.id);
            scrollToSection(item.id);
            setOpen(false);
            return;
        }

        setOpen(false);
    };

    const currentIsDark = isDark;

    return (
        <nav className={`${styles.menuContainer} ${open ? styles.active : ''}`} aria-label="Navegação principal">

            {/* Hamburger */}
            <button
                type="button"
                className={`${styles.hamburger} ${open ? styles.active : ''}`}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls="primary-menu"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            >
                <span className={styles.bar1}></span>
                <span className={styles.bar2}></span>
                <span className={styles.bar3}></span>
            </button>

            <Link href="/" className={styles.logoLink} aria-label="Voltar para a página inicial">
                <Logo colorPrimary='#91bf27' colorSecondary='#595959' className={`${open ? styles.logo : ''}`} />
            </Link>

            {/* Menu */}
            <div id="primary-menu" className={`${styles.menuContent} ${open ? styles.showMenu : ''}`}>
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

            <div className={styles.languageContainer}>
                <button
                    type="button"
                    className={styles.languageToggle}
                    onClick={toggleLanguage}
                    aria-label={`Mudar idioma para ${language === 'pt' ? 'inglês' : 'português'}`}
                    title={`Mudar idioma para ${language === 'pt' ? 'inglês' : 'português'}`}
                >
                    <Tooltip
                        title={language === 'pt' ? 'Português (Brasil)' : 'English (United States)'}
                        placement="bottom"
                        arrow
                        slotProps={{
                            tooltip: {
                                sx: {
                                    borderRadius: '0.6rem',
                                },
                            },
                        }}
                    >
                        <i
                            className={[styles.languageFlag, 'fi', language === 'pt' ? 'fi-br' : 'fi-us'].join(' ')}
                            aria-hidden="true"
                        />
                    </Tooltip>
        
                </button>

                <button
                    type="button"
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label={`Ativar modo ${currentIsDark ? 'claro' : 'escuro'}`}
                    title={`Ativar modo ${currentIsDark ? 'claro' : 'escuro'}`}
                >
                    {currentIsDark ? <MdLightMode className={styles.icon} size={18} /> : <MdDarkMode size={18} />}
                    <span className={styles.themeToggleLabel}>
                        {currentIsDark ? 'Light' : 'Dark'}
                    </span>
                </button>
            </div>

        </nav>
    );
};

export default Menu;
