import React, { useEffect, useState } from "react";
import * as Styled from './SearchDrinksComponent.style'

const SearchDrinksComponent = () => {
    const [placeholder, setPlaceholder] = useState("")

    useEffect(() =>{
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => setPlaceholder(data.drinks[0].strDrink))
    }, [])

    return (
        <Styled.SearchBarContainer>
            <input type="text" placeholder={`${placeholder}...`}/>
        </Styled.SearchBarContainer>
    )
}

export default SearchDrinksComponent