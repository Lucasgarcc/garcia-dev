'use client';

import { AppBar, Toolbar, Typography } from '@mui/material';
import Menu from '@/app/_components/Menu/Menu';
import styles from './Header.module.css';
import { NavItem } from '@/core/interfaces/nav';
import { useNavigation } from '@/core/context/NavigationContext';
import { useLanguage } from '@/app/core/context/LanguageContext';

const Header = () => {

    const { page } = useNavigation();
    const { t } = useLanguage();
    const navigationMap: Record<string, NavItem[]> = {
        home: [
            { id: 'intro', label: 'Home', href: '/', page: 'home', type: 'section' },
            { id: 'about', label: t.nav.about, href: '/', page: 'home', type: 'section' },
            { id: 'timeline', label: t.nav.experience, href: '/', page: 'home', type: 'section' },
            { id: 'differential', label: t.nav.strengths, href: '/', page: 'home', type: 'section' },
            { id: 'contact', label: t.nav.contact, href: '/', page: 'home', type: 'section' },
            { id: 'projects', label: t.nav.projects, href: '/projects', page: 'projects', type: 'route' },
        ],
        projects: [
            { id: 'home', label: 'Home', href: '/', page: 'home', type: 'route' },
            { id: 'post', label: 'Post', href: '/projects', page: 'projects', type: 'section' },
            { id: 'skills', label: t.nav.skills, href: '/projects', page: 'projects', type: 'section' },
            { id: 'technicalLevel', label: t.nav.technicalLevel, href: '/projects', page: 'projects', type: 'section' },
            { id: 'articles', label: t.nav.articles, href: '/projects', page: 'projects', type: 'section' },
            { id: 'portfolio', label: t.nav.portfolio, href: '/projects', page: 'projects', type: 'section' },
        ],
        article: [
            { id: 'projects', label: 'Portfolio', href: '/projects', page: 'projects', type: 'route' },
            { id: 'artContent', label: t.nav.content, href: '/articles', page: 'articles', type: 'section' },
            { id: 'artRelated', label: t.nav.relatedArticles, href: '/articles', page: 'articles', type: 'section' },
        ]
    };

    const currentPageKey = page.includes('article') ? 'article' : page;

    const navItems = navigationMap[currentPageKey] || navigationMap['home'];

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'none',
                color: 'var(--color-header)',
                boxShadow: 'none',
                zIndex: 1100
            }}
        >
            <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    <div className={styles.containerToolBar}>
                        <Menu items={navItems} />
                    </div>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
