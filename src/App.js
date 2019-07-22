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
  const [state, setState] = useState({
    selectedLocationId: null,
    selectedCategory: "",
    categories: ["restaurant", "coffe", "hiking"],
    locations: []
  });

  return (
    <Provider value={{
      data:state,
      setSelectedCategory: (selectedCategory) => {
        setState({ ...state, selectedCategory });
      },
      removeSelectedCategory: () => {
        const sel = state.selectedCategory;
        setState({ ...state,  categories: [...state.categories.filter(cat => cat !== sel)], selectedCategory: ''});
      },
      addCategory: (category) => {
        setState({ ...state,  categories: [...state.categories, category]});
      },
      updateCategory: (category) => {
        const sel = state.selectedCategory;
        setState({ ...state,  categories: [...state.categories.filter(cat => cat !== sel), category], selectedCategory: category});
      }
    }}>
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
