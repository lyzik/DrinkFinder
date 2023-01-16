import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DrinkListElement from "../DrinkListElement/DrinkListElement";
import * as Styled from './SearchByIngredients.style'

const SearchByIngredients = () => {
    const [ingredientName, setIngredientName] = useState() // This state is using in fetching data (string)
    const [ingredientsList, setIngredientsList] = useState([]) //List of ingredients 
    const [selectedIngredients, setSelectedIngredients] = useState([]) // Array of ingredients
    const [drinks, setDrinks] = useState(0); // List of drinks based on ingredients
    const [input, setInput] = useState("");

    //Getting session ingredients and drinks if exists
    useEffect(() => {
        sessionStorage.getItem(`ingredients`) ? 
        setSelectedIngredients(JSON.parse(sessionStorage.getItem(`ingredients`))) : null

        sessionStorage.getItem(`drinks`) ? 
        setDrinks(JSON.parse(sessionStorage.getItem(`drinks`))) : null
    }, [])

    // Fetching all drinks with ingredients
    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
        .then(res => res.json())
        .then(data => {
            !drinks ? setDrinks(data.drinks)
            : (setDrinks(mergingArrays(data.drinks, drinks, "idDrink"))) 
        })
        .then(() => {
            setIngredientName("")
        })
    }, [ingredientName])

    //List of ingredients
    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v2/1/list.php?i=list")
        .then(res => res.json())
        // .then(data => setIngredientsList([...new Set(ingredients.concat(data.drinks).map(el => el))]))
        .then(data => {
            sessionStorage.getItem(`allIngredients`) ? 
            setIngredientsList(JSON.parse(sessionStorage.getItem(`allIngredients`))) : setIngredientsList(data.drinks)
        })
        }, [])

    const handleChange = React.useCallback((event) => {
        setInput(event.target.value)
    }, [])

    const removeIngredient = ingToRemove => {
        setDrinks(0)
        setSelectedIngredients(selectedIngredients.filter(element => {
            if(element !== ingToRemove){
                setIngredientName(element)
                return element
            }
        })
        );
    }
    
    const mergingArrays = (arr1, arr2, key) => {
        return arr1.filter(item1 => arr2.some(item2 => item1[key] === item2[key]));
    }

    window.addEventListener('beforeunload', (event) => {
        sessionStorage.setItem('ingredients', JSON.stringify(selectedIngredients));
        sessionStorage.setItem('drinks', JSON.stringify(drinks));
        sessionStorage.setItem('allIngredients', JSON.stringify(ingredientsList));
    }); //Find new solution

    return (
        <Styled.Main>
            <div>
                <Styled.Ingredients>
                    <button onClick={
                        () => {                }
                    }>
                        napraw
                    </button>
                    <input type="text" placeholder={`find ingredient`} onChange={handleChange} value={input}/>
                    {
                        selectedIngredients ? selectedIngredients.map(element => (
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
                                setSelectedIngredients(ingredients => [element.strIngredient1, ...ingredients]);
                                setIngredientsList(ingredientsList.filter(elementFromList => {
                                    return elementFromList.strIngredient1 !== element.strIngredient1
                                }))
                            }}>
                                <p>{element.strIngredient1} 
                                <span className="material-symbols-sharp">add_circle</span></p>
                            </Styled.Ingredient>
                        )) : null
                    }
                </Styled.Ingredients>
            </div>
            {
            selectedIngredients ? 
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
