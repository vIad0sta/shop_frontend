import React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';


const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Мій сайт
                </Typography>
                <Button onClick={() => window.location.href = '/'} color="inherit">Home</Button>
                <Button onClick={() => window.location.href = '/login'} color="inherit">Login</Button>
                <Button onClick={() => window.location.href = '/registration'} color="inherit">Registration</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
