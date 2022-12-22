import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/dataSlice";
import DrinkListElement from "../DrinkListElement/DrinkListElement";
import * as Styled from "./DrinksList.style"
import { Link } from "react-router-dom"

const DrinksList = () => {
    const dispatch = useDispatch();
    const canFetch = useRef(false)
    const drinks = useSelector(state => state.data).drinks
    const [glassesType, setGlassesType] = useState([])
    const [currentType, setCurrentType] = useState(0)


    useEffect(()=>{
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`)
        .then(res => res.json())
        .then(data => setGlassesType(data))
        .then(() => canFetch.current = true)
    }, [])

    useEffect(() => {
        if(canFetch.current){
            dispatch(fetchData(glassesType.drinks[currentType].strGlass))
        }
    }, [canFetch.current, currentType])

    function handleClick(){
        setCurrentType(currentType + 1)
    }

    return (<Styled.DataContainer>
        {drinks.map(drink => (
            <DrinkListElement drink={drink} key={drink.idDrink}/>
        ))}
        <button onClick={() => handleClick()}>Get more!</button>
    </Styled.DataContainer>)
}

export default DrinksList