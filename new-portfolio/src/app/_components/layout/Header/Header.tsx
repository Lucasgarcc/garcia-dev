'use client';

import { AppBar, Toolbar, Typography } from '@mui/material';
import Menu from '@/app/_components/Menu/Menu';
import styles from './Header.module.css';
import { NavItem } from '@/core/interfaces/nav';
import { useNavigation } from '@/core/context/NavigationContext';

const Header = () => {

    const { page } = useNavigation();
    const navigationMap: Record<string, NavItem[]> = {
        home: [
            { id: 'intro', label: 'Home', href: '/', page: 'home', type: 'section' },
            { id: 'about', label: 'Sobre', href: '/', page: 'home', type: 'section' },
            { id: 'timeline', label: 'Experiência', href: '/', page: 'home', type: 'section' },
            { id: 'differential', label: 'Diferencial', href: '/', page: 'home', type: 'section' },
            { id: 'contact', label: 'Contato', href: '/', page: 'home', type: 'section' },
            { id: 'projects', label: 'Projetos', href: '/projects', page: 'projects', type: 'route' },
        ],
        projects: [
            { id: 'home', label: 'Home', href: '/', page: 'home', type: 'route' },
            { id: 'post', label: 'Post', href: '/projects', page: 'projects', type: 'section' },
            { id: 'skills', label: 'Habilidades', href: '/projects', page: 'projects', type: 'section' },
            { id: 'technicalLevel', label: 'Nível Técnico', href: '/projects', page: 'projects', type: 'section' },
            { id: 'articles', label: 'Artigos Tech', href: '/projects', page: 'projects', type: 'section' },
            { id: 'portfolio', label: 'Portfólio', href: '/projects', page: 'projects', type: 'section' },
        ],
        article: [
            { id: 'projects', label: 'Portfólio', href: '/projects', page: 'projects', type: 'route' },
            { id: 'artContent', label: 'Conteúdo', href: '/articles', page: 'articles', type: 'section' },
            { id: 'artRelated', label: 'Outros Artigos', href: '/articles', page: 'articles', type: 'section' },
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
