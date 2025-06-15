'use client';
import '../../../globals.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Logo from '@/assets/logo.svg';
//import Image from 'next/image';
import HeaderStyle from './Header.module.css';

const Header = () => {

    return (
        <AppBar sx={{ backgroundColor: 'var(--bg-header)', color: 'var(--color-header)', boxShadow: 'none' }} position="static">
            <Toolbar >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Logo  
                        alt="Logo" width={100}
                        height={100} 
                        className={`${HeaderStyle.logo} ${HeaderStyle.path1} ${HeaderStyle.path2} ${HeaderStyle.path3} ${HeaderStyle.paint_linear} `} 
                    />
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;