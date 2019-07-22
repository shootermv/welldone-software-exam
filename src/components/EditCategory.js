import React from "react";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";

export default function EditCategory({history}) {
  const [value, setValues] = React.useState("restaurant");

  const handleChange = name => event => {
    setValues(event.target.value);
  };

  const handleSubmit = (evt) => {
     history.push('/categories')
  };
  return (
    <form noValidate autoComplete="off">
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            {"Edit Category"}
          </Typography>

        </Toolbar>
        <Fab color="primary" aria-label="Done" onClick={handleSubmit}>
            <DoneIcon />
          </Fab>
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
