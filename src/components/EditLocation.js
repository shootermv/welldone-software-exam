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

    const {data: {locations} } = useContext(AppContext);

    const [location, setValues] = useState(
        match.params.id !== "new" ? locations.find(loc => loc.id === +match.params.id) : {name:"" , address:"", coordinates: [null, null], categories: []}
    );

    const handleChange = name => event => {
        setValues({ ...location, [name]: event.target.value });
    };
    
    const handleSubmit = evt => {
        evt.preventDefault();
        if (!location.name) {return;}
        //match.params.id !== "new" ? updateCategory(value) : addCategory(value);
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
          </Paper>
        </Container>
      </form>)
}