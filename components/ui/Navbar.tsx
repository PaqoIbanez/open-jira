import { Brightness4Outlined, DarkModeOutlined } from '@mui/icons-material';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link';

import { useContext } from 'react';
import { UIContext } from '../../context/ui';

export const Navbar = () => {

    const { openSideMenu } = useContext(UIContext);

    return (
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    onClick={openSideMenu}
                >
                    <MenuOpenOutlinedIcon />
                </IconButton>
                <NextLink href='/' passHref>
                    <Link underline='none' sx={{ flexGrow: 1 }}>
                        <Typography  variant='h6'>
                            OpenJira
                        </Typography>
                    </Link>
                </NextLink>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                >
                    {
                        true ?
                            <DarkModeOutlined />
                            :
                            <Brightness4Outlined />
                    }
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
