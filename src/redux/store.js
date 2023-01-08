import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import favoritesSlice from "./favoritesSlice";

export const store = configureStore({ reducer: {
    data: dataSlice,
    favorites: favoritesSlice
} },  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())