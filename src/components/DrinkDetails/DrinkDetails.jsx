import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Styled from "./DrinkDetails.style"

const DrinkDetails = () => {
    let {id} = useParams()
    const [drinkData, setDrinkData] = useState()
    const ingredient = []
    let currIng = 1;

    if(drinkData) {
        while(drinkData[`strIngredient` + currIng]){
            ingredient.push(drinkData[`strIngredient` + currIng])
            console.log(ingredient)
            currIng++
        }
    }

    useEffect(() =>{
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => setDrinkData(data.drinks[0]))
    }, [])

    //<h1>{drinkData ? drinkData.drinks[0].strDrink : null}</h1>

    return drinkData ? (
        <Styled.Main>
            <Styled.ImgContainer>
                <img src={drinkData.strDrinkThumb} />
            </Styled.ImgContainer>
            <Styled.Info>
                <h1>{drinkData.strDrink}</h1>
                {ingredient.map(ingredient => (
                    <h3>{ingredient}</h3>
                ))}
            </Styled.Info>
        </Styled.Main>
    ) : null

}

export default DrinkDetails