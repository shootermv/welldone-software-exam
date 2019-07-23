import React, { useContext, useState,  forwardRef } from "react";

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* buttons */
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



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
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
export default function Locations({ history, match }, props) {
  const classes = useStyles();

  const {
    data: { locations, selectedLocationId, categories },
    setSelectedLocation,
    removeSelectedLocation
  } = useContext(AppContext);

  const [selectedRows, setSelectedRows] = useState(0);

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
            {"Locations - must select single row for edit or delete"}
          </Typography>

          <IconButton
            aria-label="Edit"
            color="inherit"
            onClick={goToEdit}
            disabled={selectedRows===0}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            color="inherit"
            onClick={handleDelete}
            disabled={selectedRows===0}
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
            icons={tableIcons}
            title="Locations"
            columns={[
                { title: 'Name', field: 'name' },
                { title: 'Address', field: 'address' },
                { title: 'Coordinates', field: 'coordinates'},
                { 
                    title: 'Categories', 
                    field: 'categories',
                    lookup: categories.reduce((acc, cat) => ({...acc, [cat]:cat}), {}),
                    render: rowData => rowData.categories.map(value => <Chip key={value} label={value} className={classes.chip} />)
                }
            ]}
            data={locations}        
            options={{
              selection: true,
              grouping: true,
              searchable: false,
              filtering: true
            }}
            onSelectionChange={(rows) => {
               // didnt manage to achieve "single row selection" - so did this hack to force user to select only one row 
               if ( rows.length===1 ) {
                     setSelectedRows(1);
                     setSelectedLocation(rows[0].id);
               } else {
                     setSelectedRows(0);
               }
            }}
         />
    
        </Paper>
      </Container>
    </div>
  );
}
