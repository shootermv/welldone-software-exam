import React from "react";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
export default function EditCategory() {
  const [value, setValues] = React.useState("restaurant");

  const handleChange = name => event => {
    setValues(event.target.value);
  };
  return (
    <form noValidate autoComplete="off">
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            {"Edit Category"}
          </Typography>
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
