'use client';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {

  return (
    <AppBar sx={{ backgroundColor: '#7CBD1E', color: '#406661' }} position="static">
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Garcia Dev
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;