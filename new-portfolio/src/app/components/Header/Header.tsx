'use client';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Menu from '../Menu/Menu';
import styles from './Header.module.css';
import { NavItem } from '@/app/types/nav';
import { useNavigation } from '../../context/NavigationContext'; // Importe seu contexto

const Header = () => {
    const { page } = useNavigation();

    // Aqui definimos os itens baseados na página atual detectada pelo Contexto
    const navItems: NavItem[] = page === 'home'
        ? [
            { id: 'intro', label: 'Home', href: '/', page: 'home', type: 'section' },
            { id: 'about', label: 'Sobre', href: '/', page: 'home', type: 'section' },
            { id: 'timeline', label: 'Experiência', href: '/', page: 'home', type: 'section' },
            { id: 'contato', label: 'Contato', href: '/', page: 'home', type: 'section' },
            { id: 'projects', label: 'Projetos', href: '/projects', page: 'projects', type: 'route' },
        ]
        : [
            { id: 'home', label: 'Home', href: '/', page: 'home', type: 'route' },
            { id: 'skills', label: 'Skills', href: '/projects', page: 'projects', type: 'section' },
            { id: 'portfolio', label: 'Portfólio', href: '/projects', page: 'projects', type: 'section' },
        ];

    return (
        <AppBar
            sx={{
                // Aplicando aquele degradê que conversamos no início!
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 100%)',
                backdropFilter: 'blur(10px)',
                color: 'var(--color-header)',
                boxShadow: 'none',
                position: 'fixed', // Geralmente headers de portfólio são fixos
                top: 0
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