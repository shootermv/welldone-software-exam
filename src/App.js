import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

/* components */
import Categories from "./components/Categories";
import EditCategory from "./components/EditCategory";
import Locations from "./components/Locations";
import BottomAppBar from "./components/BottomAppBar";

/* context */
import { Provider } from "./AppContext";

export default function App() {
  const context = useState({
    selectedLocationId: null,
    selectedCategory: "",
    categories: ["restaurant", "coffe", "hiking"],
    locations: [],
    handleCategoryChange() {},
    handleLocationChange() {},
    getCategories() {},
    getLocations() {}
  });

  return (
    <Provider value={context}>
      <Router>
        <Switch>
          <Route path="/categories" exact component={Categories} />
          <Route path="/categories/:id" exact component={EditCategory} />
          <Route path="/locations" component={Locations} />
          <Route exact path="/" render={() => <Redirect to="/categories" />} />
        </Switch>
        <BottomAppBar />
      </Router>
    </Provider>
  );
}
