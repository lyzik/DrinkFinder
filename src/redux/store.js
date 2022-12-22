import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

export const store = configureStore({ reducer: {
    data: dataSlice,
} },  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())