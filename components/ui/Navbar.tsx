import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { Brightness4Outlined, DarkModeOutlined, MenuOpenOutlined } from '@mui/icons-material';

import { UIContext } from '../../context/ui';

export const Navbar = () => {

    const { theme, openSideMenu, toggleTheme } = useContext(UIContext);

    const onThemeChange = () => {
        toggleTheme(theme);
    }

    return (
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    onClick={openSideMenu}
                >
                    <MenuOpenOutlined />
                </IconButton>
                <NextLink href='/' passHref>
                    <Link underline='none' sx={{ flexGrow: 1 }}>
                        <Typography variant='h6'>
                            OpenJira
                        </Typography>
                    </Link>
                </NextLink>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'

                    onClick={onThemeChange}
                >
                    {
                        theme === 'dark' ?
                            <DarkModeOutlined />
                            :
                            <Brightness4Outlined />
                    }
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
