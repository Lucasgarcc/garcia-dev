'use client';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Logo from '../../Logo/Logo';
import Menu from '../../Menu/Menu';
import styles from './Header.module.css'

const Header = () => {

    const navItems = [
        { id: 'intro', label: 'Início', href: '#intro' },
        { id: 'about', label: 'Sobre', href: '#about' },
        { id: 'timeline', label: 'Linha do Tempo', href: '#timeline' },
        { id: 'diferencial', label: 'Diferenciais', href: '#diferencial' },
        { id: 'contato', label: 'Contato', href: '#contato' },
    ]

    return (
        <AppBar sx={{ backgroundColor: 'var(--bg-header)', color: 'var(--color-header)', boxShadow: 'none' }} position="static">
            <Toolbar >
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    <div className={styles.containerToolBar}>

                        <Logo colorPrimary='#91bf27' colorSecondary='#595959' />

                        <Menu items={navItems}/>
                    </div>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;