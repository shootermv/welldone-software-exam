import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

function Categories({history}) {
  const [selectedCategory, setSelected] = useState('');
  const [categories, setCategory] = useState(["restaurant", "coffe", "hiking"]);
  const handleToggle = value => () => {
    setSelected(value);
  };
  const goToEdit = () => {
    history.push(`/categories/${selectedCategory}`)
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            {"Categories"}
          </Typography>
        </Toolbar>
        <Fab color="primary" aria-label="Edit" onClick={goToEdit} disabled={selectedCategory !=='' ? false : true}>
          <EditIcon />
        </Fab>
      </AppBar>
      <List>
        {categories.map(category => {
          const labelId = `checkbox-list-label-${category}`;
          return (
            <ListItem
              key={category}
              role={undefined}
              dense
              button
              onClick={handleToggle(category)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={category === selectedCategory}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={category} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default Categories;
