import React, {useContext} from "react";

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* action buttons */
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";

export default function EditLocation({ history, match }) {

    const [value, setValues] = React.useState(
        match.params.id !== "new" ? match.params.id : ""
    );
    
    const handleChange = name => event => {
        setValues(event.target.value);
    };
    
    const handleSubmit = evt => {
        evt.preventDefault();
        if (!value) {return;}
        //match.params.id !== "new" ? updateCategory(value) : addCategory(value);
        history.push("/locations");
    };


    return (<form noValidate autoComplete="off" onSubmit={handleSubmit}>

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

      </form>)
}