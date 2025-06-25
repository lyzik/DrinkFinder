import React, { useEffect, useState } from "react";
import DrinkListElement from "../DrinkListElement/DrinkListElement";
import * as Styled from "./SearchDrinksComponent.style";

const SearchDrinksComponent = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [input, setInput] = useState("");
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => setPlaceholder(data.drinks[0].strDrink));
  }, []);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
      .then((res) => res.json())
      .then((data) => setDrinks(Array.isArray(data.drinks) ? data.drinks : []))
      .catch(() => setDrinks([]));
  }, [input]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <Styled.SearchBarContainer>
        <input
          type="text"
          placeholder={`${placeholder}...`}
          value={input}
          onChange={handleChange}
        />
      </Styled.SearchBarContainer>

      {drinks.map((drink) => (
        <DrinkListElement drink={drink} key={drink.idDrink} isFavorite={null} />
      ))}
    </>
  );
};

export default SearchDrinksComponent;
