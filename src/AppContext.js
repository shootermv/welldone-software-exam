

import React from "react";

export const AppContext = React.createContext({
  selectedLocationId: null,
  selectedCategory: "",
  categories: [],
  locations: [],
  handleCategoryChange() {},
  handleLocationChange() {},
  getCategories() {},
  getLocations() {}
});

export const Provider = AppContext.Provider;
export const Consumer = AppContext.Consumer;

