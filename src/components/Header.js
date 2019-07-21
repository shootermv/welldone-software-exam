import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
function Header({title}) {
    const classes = useStyles();
  
    return (
            <AppBar position="static">
               
               <Toolbar>
    
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                </Toolbar>
            </AppBar>
        )
    }


export default Header;