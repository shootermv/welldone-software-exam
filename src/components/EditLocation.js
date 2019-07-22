import React, {useContext, useState} from "react";

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* action buttons */
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";


/* context */
import { AppContext } from "../AppContext";

/* form */
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

/* chips */
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export default function EditLocation({ history, match }) {

    const classes = useStyles();

    const {data: {locations, categories}, updateLocation, addLocation } = useContext(AppContext);

    const [location, setValues] = useState(
        match.params.id !== "new" ? locations.find(loc => loc.id === +match.params.id) : {name:"" , address:"", coordinates: [null, null], categories: []}
    );

    const handleChange = name => event => {
        setValues({ ...location, [name]: event.target.value });
    };
    
    const handleSubmit = evt => {
        evt.preventDefault();
        if (!location.name || !location.address) {return;}
        match.params.id !== "new" ? updateLocation(location) : addLocation(location);
        history.push("/locations");
    };


    return (
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              {"Edit Location"}
            </Typography>
          </Toolbar>
          <Fab color="primary" aria-label="Done">
            <DoneIcon onClick={handleSubmit}/>
          </Fab>
        </AppBar>


        <Container>
          <Paper>
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={location.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <TextField
            id="address"
            label="Address"
            className={classes.textField}
            value={location.address}
            onChange={handleChange('address')}
            margin="normal"
          />     

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
                  <MenuItem key={cat} value={cat} >
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>





          </Paper>
        </Container>
      </form>)
}