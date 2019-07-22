import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';




function Header({title}) {
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    return (
            <AppBar position="static">  

              <Grid
                justify="space-between" // Add it here :)
                container 
                spacing={10}
                >
                <Grid item>
                  <Toolbar>
                    <Typography type="title" color="inherit">
                    {title}
                    </Typography>
                  </Toolbar>
                </Grid>

                <Grid item>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="off"
                        aria-label="Scrollable prevent tabs example"
                        >
                        <Tab icon={<ListIcon />} aria-label="Phone"  />
                        <Tab icon={<EditIcon />} aria-label="Favorite"  />
                        <Tab icon={<DeleteIcon />} aria-label="Person"  />
                        <Tab icon={<AddCircleIcon />} aria-label="Help" />

                    </Tabs> 
                </Grid>
               </Grid>           
            </AppBar>
        )
    }


export default Header;