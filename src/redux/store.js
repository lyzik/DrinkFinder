import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import favoritesSlice from "./favoritesSlice";

export const store = configureStore({ reducer: {
    data: dataSlice,
    favorites: favoritesSlice
} })