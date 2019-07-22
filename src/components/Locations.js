import React from 'react';

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* buttons */
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";



export default function Locations({history, match}) {
    const selectedLocationId= ''
    const handleToggle = value => () => {
    };
     
    const goToEdit = () => {
    };
     
    const handleDelete = () => {
    };
     
    const handleAdd = () => {
         history.push(`/locations/new`);
    }
    
    return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <Typography type="title" color="inherit">
                        {"Locations"}
                    </Typography>
                    </Toolbar>
                    <Fab color="primary" aria-label="Edit" onClick={goToEdit} disabled={selectedLocationId !== '' ? false : true}>
                       <EditIcon />
                    </Fab>
                    <Fab color="primary" aria-label="Delete" onClick={handleDelete} disabled={selectedLocationId !== '' ? false : true}>
                      <DeleteIcon />
                    </Fab>   
                    <Fab color="primary" aria-label="Add" onClick={handleAdd}>
                      <AddIcon />
                    </Fab>               
                </AppBar>
                Locations
            </div>
        )
}



