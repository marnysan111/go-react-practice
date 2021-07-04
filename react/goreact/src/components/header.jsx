import React from 'react'
import {AppBar, Typography, Drawer, Button, Toolbar, IconButton, List,ListItem, Divider, ListItemIcon, ListItemText} from '@material-ui/core';
import {MenuIcon, InboxIcon, MailIcon} from '@material-ui/icons/Menu';

export default function Header() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography>Todo</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}