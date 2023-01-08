import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { toggleFavoriteDrink } from "../../redux/favoritesSlice";
import * as Styled from "./DrinkListElement.style"
import { useSelector } from "react-redux";

const DrinkListElement = ( {drink} ) => {
    // const [favourite, setFavorite] = useState([localStorage.getItem(drink.drinkId)])

    const favorites = useSelector(state => state.favorites.favoritesId)
    const isFavorite = favorites[drink.idDrink] || false
    const dispatch = useDispatch()

    // const setFavoriteDrink = drinkId => {
    //     if(!localStorage.getItem(drinkId)){
    //         localStorage.setItem(drinkId, true);
    //     }else{
    //         localStorage.removeItem(drinkId)
    //     }
    // }

    const setFavoriteDrink = drinkId => {
        dispatch(toggleFavoriteDrink(drinkId))
    }

    return (
    <Styled.Drink key={drink.idDrink} color={isFavorite ? "red" : "lightgray"}>
        <Styled.Link href={`/drinks/${drink.idDrink}`}>
            <Styled.Image>
                <img src={drink.strDrinkThumb} alt="" />
            </Styled.Image>
        </Styled.Link>
        <Styled.Link href={`/drinks/${drink.idDrink}`}>
            <Styled.Text>
                <h2>{drink.strDrink}</h2>
            </Styled.Text>
        </Styled.Link>
        <div>
            <span className="material-symbols-sharp" onClick={() => {setFavoriteDrink(drink.idDrink)}}>
                favorite
            </span>
        </div>
    </Styled.Drink>)
}

export default DrinkListElement