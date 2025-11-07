'use client';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Logo from '../../Logo/Logo';
//import Image from 'next/image';

const Header = () => {

    return (
        <AppBar sx={{ backgroundColor: 'var(--bg-header)', color: 'var(--color-header)', boxShadow: 'none' }} position="static">
            <Toolbar >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Logo colorPrimary='#91bf27' colorSecondary='#595959' />
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;