import { Inbox, Mail } from '@mui/icons-material'
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { useContext, useState } from 'react'
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts']

export const Sidebar = () => {


    const { closeSideMenu, sidemenuOpen } = useContext(UIContext);

    return (
        <Drawer
            anchor="left"
            open={sidemenuOpen}
            onClose={closeSideMenu}
        >
            <Box
                sx={{ width: 250 }}
                onClick={closeSideMenu}
                onKeyDown={closeSideMenu}
            >
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant='h4'>Menu</Typography>
                </Box>
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}
