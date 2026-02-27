'use client';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Menu from '../Menu/Menu';
import styles from './Header.module.css'
import { NavItem } from '@/app/types/nav';

const Header = () => {

    const navItems: NavItem[] = [
        { id: 'intro', label: 'Início', href: '/', page: 'home', type: 'section' },
        { id: 'about', label: 'Sobre', href: '/', page: 'home', type: 'section' },
        { id: 'projects', label: 'Projetos', href: '/projects', page: 'projects',
         type: 'route' },
    ];

    return (
        <AppBar sx={{ backgroundColor: 'var(--bg-header)', color: 'var(--color-header)', boxShadow: 'none' }} position="static">
            <Toolbar >
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    <div className={styles.containerToolBar}>
                        <Menu items={navItems}/>
                    </div>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;