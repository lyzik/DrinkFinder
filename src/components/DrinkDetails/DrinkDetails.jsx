import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Styled from "./DrinkDetails.style"

const DrinkDetails = () => {
    let {id} = useParams()
    const [drinkData, setDrinkData] = useState()
    const [ingredients, setIngredients] = useState([])


    useEffect(() =>{
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => setDrinkData(data.drinks[0]))
    }, [])

    useEffect(()=> {
        if(drinkData){
            let tempArr = []
            for(let i = 1; drinkData[`strIngredient` + i]; i++){
                tempArr.push(drinkData[`strIngredient` + i])
            }
            setIngredients(tempArr)
        }
    }, [drinkData])
    

    return drinkData && ingredients ? (
        <Styled.Main>
            <div className="LeftSide">
                <Styled.Info>
                    <Styled.ImgContainer>
                        <img src={drinkData.strDrinkThumb} />
                    </Styled.ImgContainer>
                    <Styled.Ingredients>
                        <h1>{drinkData.strDrink}</h1>
                        {ingredients.map((ingredient, index) => (
                            <h3 key={index}>
                                {ingredient}  
                                {drinkData[`strMeasure` + (index + 1)] ? ` - ${drinkData[`strMeasure` + (index + 1)]}` : ""}
                            </h3>
                        ))}
                    </Styled.Ingredients>
                </Styled.Info>
                <Styled.Recipe>
                    <h3>{drinkData.strInstructions}</h3>
                </Styled.Recipe>
            </div>
            <Styled.RightSide>
                <Styled.moreInfo>
                    <h3>- {drinkData.strCategory}</h3>
                    <h3>- {drinkData.strAlcoholic}</h3>
                    <h3>- {drinkData.strGlass}</h3>
                </Styled.moreInfo>
            </Styled.RightSide>
        </Styled.Main>
    ) : null
    
}

export default DrinkDetails