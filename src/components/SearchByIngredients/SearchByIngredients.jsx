import React, { useEffect, useState, useCallback } from "react";
import { useBeforeUnload } from "../../hooks/useBeforeUnload";
import DrinkListElement from "../DrinkListElement/DrinkListElement";
import * as Styled from "./SearchByIngredients.style";

const SearchByIngredients = () => {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [input, setInput] = useState("");
  const [additionalIngredientLoading, setAdditionalIngredientLoading] = useState(false);
  const [drinksVisible, setDrinksVisible] = useState(false);

  useEffect(() => {
    const storedIngredients = sessionStorage.getItem("ingredients");
    const storedDrinks = sessionStorage.getItem("drinks");
    if (storedIngredients) setSelectedIngredients(JSON.parse(storedIngredients));
    if (storedDrinks) setDrinks(JSON.parse(storedDrinks));
  }, []);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
      .then((res) => res.json())
      .then((data) => {
        const list = data.drinks || [];
        setIngredientsList(list);
        sessionStorage.setItem("allIngredients", JSON.stringify(list));
      })
      .catch((err) => console.error("Failed to fetch ingredients list:", err));
  }, []);

  useEffect(() => {
    if (!ingredientName) return;

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
        ingredientName
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        const newDrinks = data.drinks || [];
        if (drinks.length === 0) {
          setDrinks(newDrinks);
        } else {
          setDrinks(mergingArrays(newDrinks, drinks, "idDrink"));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIngredientName(""));
  }, [ingredientName]);

  useEffect(() => {
    if (
      input &&
      !additionalIngredientLoading &&
      !ingredientsList.some((i) =>
        i.strIngredient1.toLowerCase().includes(input.toLowerCase())
      )
    ) {
      setAdditionalIngredientLoading(true);
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${encodeURIComponent(
          input
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          const newIng = data?.ingredients?.[0]?.strIngredient;
          if (newIng) {
            setIngredientsList((prev) => [{ strIngredient1: newIng }, ...prev]);
            sessionStorage.setItem(
              "allIngredients",
              JSON.stringify([{ strIngredient1: newIng }, ...ingredientsList])
            );
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setAdditionalIngredientLoading(false));
    }
  }, [input, ingredientsList, additionalIngredientLoading]);

  const handleChange = useCallback((e) => setInput(e.target.value), []);

  const removeIngredient = (ingToRemove) => {
    const updated = selectedIngredients.filter((el) => el !== ingToRemove);
    setSelectedIngredients(updated);
    setDrinks([]);
    setIngredientName(updated[0] || "");
    setIngredientsList((prev) => [{ strIngredient1: ingToRemove }, ...prev]);
    sessionStorage.setItem("ingredients", JSON.stringify(updated));
    sessionStorage.setItem("drinks", JSON.stringify([]));
  };

  const mergingArrays = (arr1, arr2, key) =>
    arr1.filter((item1) => arr2.some((item2) => item1[key] === item2[key]));

  useBeforeUnload(selectedIngredients, drinks, ingredientsList);

  return (
    <Styled.Main>
      <div>
        <Styled.Ingredients fullWidth={+!!selectedIngredients.length} drinksVisible={drinksVisible}>
          <input
            type="text"
            placeholder="find ingredient"
            value={input}
            onChange={handleChange}
          />
          <div className="ing-container">
            {selectedIngredients.map((el, i) => (
              <p key={`${el}-${i}`} onClick={() => removeIngredient(el)}>
                {el}
                <span className="material-symbols-sharp">remove_circle</span>
              </p>
            ))}
            {ingredientsList
              .filter((ing) =>
                ing.strIngredient1.toLowerCase().includes(input.toLowerCase())
              )
              .map((ing, i) => (
                <Styled.Ingredient
                  key={`${ing.strIngredient1}-${i}`}                  onClick={() => {
                    setIngredientName(ing.strIngredient1);
                    setSelectedIngredients((prev) => [ing.strIngredient1, ...prev]);
                    setIngredientsList((prev) =>
                      prev.filter((e) => e.strIngredient1 !== ing.strIngredient1)
                    );
                    sessionStorage.setItem(
                      "ingredients",
                      JSON.stringify([ing.strIngredient1, ...selectedIngredients])
                    );
                  }}
                >
                  <p>
                    {ing.strIngredient1}
                    <span className="material-symbols-sharp">add_circle</span>
                  </p>
                </Styled.Ingredient>
              ))}
          </div>
        </Styled.Ingredients>
      </div>

      {drinksVisible && drinks.length === 0 && <h1 className="notFound">No drinks found</h1>}

      {selectedIngredients.length > 0 && (
        <Styled.Drinks visible={1} drinksVisible={drinksVisible}>
          {drinks.map((drink) => (
            <DrinkListElement key={drink.idDrink} drink={drink} isFavorite={null} />
          ))}
        </Styled.Drinks>
      )}

      <p className="visibleSetter" onClick={() => setDrinksVisible((vis) => !vis)}>
        <span className="material-symbols-sharp">
          {drinksVisible ? "arrow_back" : "arrow_forward"}
        </span>
      </p>
      <p className="drinksAmount">{drinks.length}</p>
    </Styled.Main>
  );
};

export default SearchByIngredients;
