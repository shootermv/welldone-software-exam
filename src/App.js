import React, {useState, useEffect} from "react";
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
import EditLocation from "./components/EditLocation";
import BottomAppBar from "./components/BottomAppBar";

/* context */
import { Provider } from "./AppContext";

const localStorageKey = "myLocations";

export default function App() {

  const fromLocalStorage = localStorage.getItem(localStorageKey) && JSON.parse(localStorage.getItem(localStorageKey));

  const [state, setState] = useState({
    selectedLocationId: (fromLocalStorage && fromLocalStorage.selectedLocationId) || null,
    selectedCategory: (fromLocalStorage && fromLocalStorage.selectedCategory) || "",
    categories: (fromLocalStorage && fromLocalStorage.categories) ||  [],
    locations: (fromLocalStorage && fromLocalStorage.locations) ||  []
  });

  /* must persist state at localStorage */
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return (
    <Provider value={{
      data: state,
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
      },
      /* locations */
      setSelectedLocation: (selectedLocationId) => {
        setState({ ...state, selectedLocationId });
      },
      updateLocation: (location) => {
        const sel = state.selectedLocationId;
        setState({ ...state,  locations: [...state.locations.filter(({id}) => id !== sel), location], selectedLocationId: location.id});
      },
      addLocation: (location) => {
        setState({ ...state,  locations: [...state.locations, location]});
      }
    }}>
      <Router>
        <Switch>
          <Route path="/categories" exact component={Categories} />
          <Route path="/categories/:id" component={EditCategory} />
          <Route path="/locations"  exact component={Locations} />
          <Route path="/locations/:id" component={EditLocation} />
          <Route exact path="/" render={() => <Redirect to="/categories" />} />
        </Switch>
        <BottomAppBar />
      </Router>
    </Provider>
  );
}
