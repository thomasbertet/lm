import React from 'react';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './Header.css';

import logo from './cpu-monitor.png';
import toto from './thomas-bertet.png';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({ spacer: { flex: 1 } }));

function Header() {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <img src={logo} className="lm-logo" alt="logo" />
                <Typography variant="h6">Load monitor</Typography>
                <div className={classes.spacer} />
                <Avatar src={toto} alt="Thomas BERTET" />
            </Toolbar>
        </AppBar>
    );
}

export default Header;
