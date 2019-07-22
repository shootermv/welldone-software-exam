import React, { useState, useContext } from "react";

/* toolbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/* buttons */
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

/* list stuff */ 
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

/* context */
import { AppContext } from "../AppContext";

function Categories({history}) {

  let {data: {categories, selectedCategory}, setSelectedCategory, removeSelectedCategory } = useContext(AppContext);

  const handleToggle = value => () => {
   setSelectedCategory(value);
  };

  const goToEdit = () => {
    history.push(`/categories/${selectedCategory}`)
  };

  const handleDelete = () => {
    removeSelectedCategory();
  };

  const handleAdd = () => {
    history.push(`/categories/new`);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            {"Categories"}
          </Typography>
        </Toolbar>
        <Fab color="primary" aria-label="Edit" onClick={goToEdit} disabled={selectedCategory !== '' ? false : true}>
          <EditIcon />
        </Fab>
        <Fab color="primary" aria-label="Delete" onClick={handleDelete} disabled={selectedCategory !== '' ? false : true}>
          <DeleteIcon />
        </Fab>   
        <Fab color="primary" aria-label="Add" onClick={handleAdd}>
          <AddIcon />
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
