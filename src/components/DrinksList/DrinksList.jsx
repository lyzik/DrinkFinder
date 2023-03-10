import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/dataSlice";
import DrinkListElement from "../DrinkListElement/DrinkListElement";
import * as Styled from "./DrinksList.style"

const DrinksList = () => {
    const dispatch = useDispatch();
    const {drinks} = useSelector(state => state.data)
    const [letterCharCode, setLetterCharCode] = useState(97)

    const handleScroll = event => {
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
            setLetterCharCode(letterCharCode + 1)
        }
    };

    window.addEventListener('scroll', handleScroll);
    useEffect(() => {
        dispatch(fetchData(String.fromCharCode(letterCharCode)))
    }, [letterCharCode])

    function handleClick(){
        setLetterCharCode(letterCharCode + 1)
    }

    return (<Styled.DataContainer>
        {drinks.map(drink => (
            <DrinkListElement drink={drink} key={drink.idDrink} isFavorite={null}/>
        ))}
        <button onClick={handleClick}>Get more!</button>
    </Styled.DataContainer>)
}

export default DrinksList