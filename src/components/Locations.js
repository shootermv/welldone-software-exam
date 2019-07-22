import React, { useContext } from "react";

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* buttons */
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

/* context */
import { AppContext } from "../AppContext";

/* table */
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    }
}));

const headRows = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  {
    id: "coordinates",
    numeric: false,
    disablePadding: false,
    label: "Coordinates"
  },
  { id: "categories", numeric: true, disablePadding: false, label: "Carbs (g)" }
];
const rows = [
  {
    name: "Vasia",
    address: "Jerusalem",
    coordinates: "1234,4354",
    categories: "restaurant"
  }
];

export default function Locations({ history, match }, props) {
  const classes = useStyles();  
  let {
    data: {
      locations,
      selectedLocationId
    }
  } = useContext(AppContext);

  const handleToggle = value => () => {};

  const goToEdit = () => {};

  const handleDelete = () => {};

  const handleAdd = () => {
    history.push(`/locations/new`);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            {"Locations"}
          </Typography>
        </Toolbar>
        <Fab
          color="primary"
          aria-label="Edit"
          onClick={goToEdit}
          disabled={selectedLocationId  ? false : true}
        >
          <EditIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label="Delete"
          onClick={handleDelete}
          disabled={selectedLocationId  ? false : true}
        >
          <DeleteIcon />
        </Fab>
        <Fab color="primary" aria-label="Add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </AppBar>

      <Container className={classes.root}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Coordinates</TableCell>
                <TableCell align="right">Categories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.coordinates}</TableCell>
                  <TableCell align="right">{row.categories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
}
