import React, { useContext } from "react";

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* buttons */
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

/* context */
import { AppContext } from "../AppContext";

/* table */
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  }
}));

export default function Locations({ history, match }, props) {
  const classes = useStyles();

  const {
    data: { locations, selectedLocationId, categories },
    setSelectedLocation,
    removeSelectedLocation
  } = useContext(AppContext);


  const goToEdit = () => {
    history.push(`/locations/${selectedLocationId}`);
  };

  const handleDelete = () => {
    removeSelectedLocation();
  };

  const handleAdd = () => {
    history.push(`/locations/new`);
  };

  /* table */
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" variant="h6" style={{ flex: 1 }}>
            {"Locations"}
          </Typography>

          <IconButton
            aria-label="Edit"
            color="inherit"
            onClick={goToEdit}
            disabled={selectedLocationId ? false : true}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            color="inherit"
            onClick={handleDelete}
            disabled={selectedLocationId ? false : true}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton 
           color="inherit"
           aria-label="Add" 
           onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container className={classes.root}>
        <Paper>
        <MaterialTable
            title="Locations"
            columns={[
                { title: 'Name', field: 'name' },
                { title: 'Address', field: 'address' },
                { title: 'Coordinates', field: 'coordinates'},
                { 
                    title: 'Categories', 
                    field: 'categories',
                    lookup: categories.reduce((acc, cat) => ({...acc, [cat]:cat}), {}),
                    render:rowData => rowData.categories.map(value => <Chip key={value} label={value} className={classes.chip} />)
                }
            ]}
            data={locations}        
            options={{
              selection: true,
              grouping: true,
              searchable: false,
              filtering: true
            }}
            onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
         />
    
        </Paper>
      </Container>
    </div>
  );
}
