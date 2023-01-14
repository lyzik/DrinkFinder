import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DrinkListElement from "../DrinkListElement/DrinkListElement";
import * as Styled from './SearchByIngredients.style'

const SearchByIngredients = () => {
    const [ingredientName, setIngredientName] = useState() // This state is using in fetching data (string)
    const [ingredientsList, setIngredientsList] = useState([])
    const [ingredients, setIngredients] = useState([]) // Array of ingredients
    const [drinks, setDrinks] = useState(0);
    const [isRemoving, setIsRemoving] = useState(false); //flag to prevent data from being repeated
    const [input, setInput] = useState("");

    //Getting session ingredients and drinks if exists
    useEffect(() => {
        sessionStorage.getItem(`ingredients`) ? 
        setIngredients(JSON.parse(sessionStorage.getItem(`ingredients`))) : null

        sessionStorage.getItem(`drinks`) ? 
        setDrinks(JSON.parse(sessionStorage.getItem(`drinks`))) : null
    }, [])

    // Fetching all drinks with ingredients
    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
        .then(res => res.json())
        .then(data => {
            !drinks ? setDrinks(data.drinks)
            : (setDrinks(findDuplicates(data.drinks, drinks, "idDrink"))) 
        })
        .then(() => {
            setIngredientName("")
        })
    }, [ingredientName])

    //List of ingredients
    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v2/1/list.php?i=list")
        .then(res => res.json())
        .then(data => setIngredientsList(data.drinks))
        // .then(data => setIngredientsList([...new Set(ingredients.concat(data.drinks).map(el => el))]))
    }, [])

    const handleChange = React.useCallback((event) => {
        setInput(event.target.value)
        setIsRemoving(false)
    }, [])

    const removeIngredient = (ingToRemove) => {
        setIsRemoving(true)
        setDrinks(0)
        setIngredients(ingredients.filter(element => {
            if(element !== ingToRemove){
                setIngredientName(element)
                return element
            }
        })
        );
    }
    const findDuplicates = (arr1, arr2, key) => {
        return arr1.filter(item1 => arr2.some(item2 => item1[key] === item2[key]));
    }

    const removeElement = ingToRemove => {
        setIngredientsList(ingredientsList.filter(element => {
            return element.strIngredient1 !== ingToRemove
        }))
    }        

    window.addEventListener('beforeunload', (event) => {
        sessionStorage.setItem('ingredients', JSON.stringify(ingredients));
        sessionStorage.setItem('drinks', JSON.stringify(drinks));
    });

    return (
        <Styled.Main>
            <div>
                <Styled.Ingredients>
                    <input type="text" placeholder={`find ingredient`} onChange={handleChange} value={input}/>
                    {
                        ingredients ? ingredients.map(element => (
                            <p key={element.index} onClick={() => {
                                    removeIngredient(element)
                                    setIngredientsList(ingredientsList => [{strIngredient1: element}, ...ingredientsList])
                                }
                            }>
                                {element}
                            <span className="material-symbols-sharp">remove_circle</span></p>
                        )) : null
                    }
                    {
                        ingredientsList ? ingredientsList.map(element => (
                            <Styled.Ingredient key={element.index} onClick={() => {
                                setIngredientName(element.strIngredient1); 
                                setIngredients(ingredients => [element.strIngredient1, ...ingredients]);
                                removeElement(element.strIngredient1)
                            }}>
                                <p>{element.strIngredient1} 
                                <span className="material-symbols-sharp">add_circle</span></p>
                            </Styled.Ingredient>
                        )) : null
                    }
                </Styled.Ingredients>
            </div>
            {
            ingredients ? 
            <Styled.Drinks>
                {drinks ? drinks.map(drink => (
                    <DrinkListElement drink={drink} key={drink.idDrink} isFavorite={null}/>
                )) : null}
            </Styled.Drinks> : null
            }
        </Styled.Main>
    )
}

export default SearchByIngredients
