import { useEffect } from "react";

export const useBeforeUnload = (selectedIngredients, drinks, ingredientsList) => {
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('ingredients', JSON.stringify(selectedIngredients));
        sessionStorage.setItem('drinks', JSON.stringify(drinks));
        sessionStorage.setItem('allIngredients', JSON.stringify(ingredientsList));
        });
        return () => {
        window.removeEventListener('beforeunload', () => {});
        };
    }, [selectedIngredients, drinks, ingredientsList]);
}