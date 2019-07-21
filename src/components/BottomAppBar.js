import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

import {Link } from "react-router-dom"; 
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  return (
    <React.Fragment>
      <CssBaseline />
  
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Tabs
            value={value}
            indicatorColor="primary"
            textColor="accent"
            aria-label="Disabled tabs example"
            fullWidth
        >
          <Tab label="categories"  icon={<FavoriteIcon />} component={Link} to="/categories" />
          <Tab label="locations"  icon={<LocationOnIcon />} component={Link} to="/locations" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}
