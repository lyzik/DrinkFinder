import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useBeforeUnload } from "../../hooks/useBeforeUnload";
import DrinkListElement from "../DrinkListElement/DrinkListElement";
import * as Styled from './SearchByIngredients.style'

const SearchByIngredients = () => {
    const [ingredientName, setIngredientName] = useState() // This state is using in fetching data (string)
    const [ingredientsList, setIngredientsList] = useState([]) //List of ingredients 
    const [selectedIngredients, setSelectedIngredients] = useState([]) // Array of ingredients
    const [drinks, setDrinks] = useState(0); // List of drinks based on ingredients
    const [input, setInput] = useState("");
    const [additionalIngredientLoading, setAdditionalIngredientLoading] = useState(false)
    const [drinksVisible, setDrinksVisible] = useState(false) //only mobile!

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
        .catch(err => console.log(err))
    }, [ingredientName])

    //List of ingredients
    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v2/1/list.php?i=list")
        .then(res => res.json())
        .then(data => {
            sessionStorage.getItem(`allIngredients`) ? 
            setIngredientsList(JSON.parse(sessionStorage.getItem(`allIngredients`))) 
            : setIngredientsList(data.drinks)
        })
    }, [])

    // Fetch ingredient that can be missing in list
    useEffect(() => {
        if(ingredientsList.filter(name => name.strIngredient1.toLowerCase().match(input.toLowerCase())).length === 0 
        && input 
        && !additionalIngredientLoading){
            setAdditionalIngredientLoading(true)
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${input}`)
            .then(res => res.json())
            .then(data => {
                data.ingredients[0].strIngredient ?
                setIngredientsList(ingredientsList => [{strIngredient1: data.ingredients[0].strIngredient}, ...ingredientsList])
                : null
            })
            .then(() => setAdditionalIngredientLoading(false))
        }
    }, [input])

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

    useBeforeUnload(selectedIngredients, drinks, ingredientsList);
    return (
        <Styled.Main>
            <div>
                <Styled.Ingredients fullWidth={selectedIngredients.length ? 1 : 0} drinksVisible={drinksVisible}>
                    <input type="text" placeholder={`find ingredient`} value={input} onChange={handleChange}/>
                    <div className="ing-container">
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
                        ingredientsList ? ingredientsList
                            .filter(name => name.strIngredient1.toLowerCase().match(input.toLowerCase()))
                            .map(element => (
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
                    </div>
                </Styled.Ingredients>
            </div>
            {
                (drinksVisible) && !drinks.length ? <h1 className="notFound">No drinks found</h1> : null
            }
            {
            selectedIngredients ? 
            <Styled.Drinks visible={selectedIngredients.length ? 1 : 0}  drinksVisible={drinksVisible}>
                {drinks ? drinks.map(drink => (
                    <DrinkListElement drink={drink} key={drink.idDrink} isFavorite={null}/>
                )) : null}
            </Styled.Drinks> : null
            }
            <p className="visibleSetter" onClick={() => setDrinksVisible(!drinksVisible)}>
                <span class="material-symbols-sharp">
                    {drinksVisible ? 'arrow_back' : 'arrow_forward'}
                </span>
            </p>
            <p className="drinksAmount">
                { drinks ? drinks.length : 0}
            </p>
        </Styled.Main>
    )
}

export default SearchByIngredients
