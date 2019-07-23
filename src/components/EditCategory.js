import React, {useContext} from "react";

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* action buttons */
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";

/* form */
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

/* context */
import { AppContext } from "../AppContext";


export default function EditCategory({ history, match }) {
  const {updateCategory, addCategory } = useContext(AppContext);
  
  const [value, setValues] = React.useState(
    match.params.id !== "new" ? match.params.id : ""
  );

  const handleChange = name => event => {
    setValues(event.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!value) {return;}
    match.params.id !== "new" ? updateCategory(value) : addCategory(value);
    history.push("/categories");
  };
  

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>

      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            {"Edit Category"}
          </Typography>
        
        <Fab color="secondary" aria-label="Done">
          <DoneIcon onClick={handleSubmit}/>
        </Fab>
        </Toolbar>
      </AppBar>

      <Container>
        <TextField
          id="standard-name"
          label="Category Name"
          value={value}
          onChange={handleChange("name")}
          margin="normal"
        />
      </Container>
    </form>
  );
}
