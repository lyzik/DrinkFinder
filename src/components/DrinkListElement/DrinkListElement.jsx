import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Styled from "./DrinkListElement.style"


function setFavoriteDrink(drinkId){
    if(!localStorage.getItem(drinkId)){
        localStorage.setItem(drinkId, true);
    }else{
        localStorage.removeItem(drinkId)
    }
}

const DrinkListElement = ( {drink} ) => {
    const [favourite, setFavorite] = useState([localStorage.getItem(drink.drinkId)])

    setFavoriteDrink(drink.drinkId, setFavorite)

    return (
    <Styled.Drink key={drink.idDrink} color={localStorage.getItem(drink.idDrink) ? "red" : "lightgray"}>
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
            <span className="material-symbols-sharp" onClick={() => {setFavoriteDrink(drink.idDrink); setFavorite(!favourite)}}>
                favorite
            </span>
        </div>
    </Styled.Drink>)
}

export default DrinkListElement