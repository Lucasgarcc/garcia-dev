'use client';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../../../../../public/assets/logo 2.svg';
import Image from 'next/image';
import HeaderStyle from './Header.module.css';

const Header = () => {

    return (
        <AppBar sx={{ backgroundColor: 'var(--bg-header)', color: 'var(--color-header)', boxShadow: 'none' }} position="static">
            <Toolbar >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Image src={logo} alt="Logo" width={100} height={100} className={HeaderStyle.logo}/>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;