import React, { useContext, useState } from "react";

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* action buttons */
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";
import PlaceIcon from "@material-ui/icons/Place";

/* context */
import { AppContext } from "../AppContext";

/* form */
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

/* chips */
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

/* modal */
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


/* map */
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import jss from 'jss';
import jssDefault from 'jss-preset-default';

import 'leaflet/dist/leaflet.css';

jss.setup(jssDefault());

jss.createStyleSheet({
  '@global': {
    '.leaflet-container': {
      height: '450px',
    },
  },
}).attach();

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
}));



export default function EditLocation({ history, match }) {
  const classes = useStyles();

  const {
    data: { locations, categories },
    updateLocation,
    addLocation
  } = useContext(AppContext);

  const [location, setValues] = useState(
    match.params.id !== "new"
      ? locations.find(loc => loc.id === +match.params.id)
      : { name: "", address: "", coordinates: [], categories: [] }
  );

  const handleChange = name => event => {
    setValues({ ...location, [name]: event.target.value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!location.name || !location.address) {
      return;
    }
    match.params.id !== "new"
      ? updateLocation(location)
      : addLocation(location);
    history.push("/locations");
  };

  /* button stuff */
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMapClick = (evt) => {
    setOpen(false);
    handleChange('coordinates')({target: {value: [evt.latlng.lat, evt.latlng.lng]}})
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            {"Edit Location"}
          </Typography>
        
        <Fab color="secondary" aria-label="Done">
          <DoneIcon onClick={handleSubmit} />
        </Fab>
        </Toolbar>
      </AppBar>

      <Container>
        <Paper>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              value={location.name}
              onChange={handleChange("name")}
              margin="normal"
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              id="address"
              label="Address"
              className={classes.textField}
              value={location.address}
              onChange={handleChange("address")}
              margin="normal"
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">Categories</InputLabel>
            <Select
              multiple
              value={location.categories}
              onChange={handleChange("categories")}
              input={<Input id="select-multiple-chip" name="categories" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            Coordinates:
            <Button variant="contained" onClick={handleOpen}>
              <PlaceIcon />{location.coordinates.length  && location.coordinates.map(c=>c.toFixed(2)).join(',')}
            </Button>
          </FormControl>

          <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
           <DialogTitle id="simple-dialog-title">Slick Some Location</DialogTitle>
           <div id="map" style={{height:"400px", width:"450px"}}>
             <Map center={[51.505, -0.09]} zoom={13} onClick={handleMapClick}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
              </Marker>
            </Map>
           </div>
          </Dialog>

        </Paper>

      </Container>
    </form>
  );
}
