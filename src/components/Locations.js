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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
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

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");

  const {
    data: { locations, selectedLocationId },
    setSelectedLocation,
    removeSelectedLocation
  } = useContext(AppContext);

  const handleClick = ({ id }) => evt => {
    setSelectedLocation(id);
  };

  const goToEdit = () => {
    history.push(`/locations/${selectedLocationId}`);
  };

  const handleDelete = () => {
    removeSelectedLocation();
  };

  const handleAdd = () => {
    history.push(`/locations/new`);
  };

  const getSorted = () => {
    let result = locations.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    return result;
  };

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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={order}
                    onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Coordinates</TableCell>
                <TableCell align="right">Categories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getSorted().map(row => (
                <TableRow key={row.name} onClick={handleClick(row)}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={row.id === selectedLocationId} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">
                    {row.coordinates.map(c => c.toFixed(2)).join(",")}
                  </TableCell>
                  <TableCell align="right">
                    {row.categories.map(cat => (
                      <Chip key={cat} label={cat} className={classes.chip} />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
}
