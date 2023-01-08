import { createSlice } from "@reduxjs/toolkit";

const favoritesDrinks = {};
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  favoritesDrinks[key] = localStorage.getItem(key);
}
const initialState = {favoritesId: favoritesDrinks}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavoriteDrink: (state, action) => {
            const drinkId  = action.payload;
            const isFavorite = state.favoritesId[drinkId] || false;
            state.favoritesId[drinkId] = !isFavorite;

            if (isFavorite) {
                localStorage.removeItem(drinkId);
            } else {
                localStorage.setItem(drinkId, true);
            }
        }
    }
})

export const { toggleFavoriteDrink } = favoritesSlice.actions

export default favoritesSlice.reducer