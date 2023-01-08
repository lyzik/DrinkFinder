import React, { useEffect, useState } from "react";
import * as Styled from './SearchDrinksComponent.style'

const SearchDrinksComponent = () => {
    const [placeholder, setPlaceholder] = useState("")
    const [input, setInput] = useState("a")
    const [drinks, setDrinks] = useState({})

    useEffect(() =>{
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => setPlaceholder(data.drinks[0].strDrink))
    }, [])

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res => res.json())
        .then(data => setDrinks(data))
        .then(console.log(drinks))
    }, [input])

    function inputHandler(input){
        setInput('b')
    }
    return (
        <Styled.SearchBarContainer>
            <input type="text" placeholder={`${placeholder}...`}/>
        </Styled.SearchBarContainer>
    )
}

export default SearchDrinksComponent